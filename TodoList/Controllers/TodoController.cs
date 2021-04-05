using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Microsoft.Extensions.Logging;



namespace TodoList.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;

        public TodoController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        [HttpGet("Todos")]
        public IActionResult GetTodos()
        {
            var todos = _todoRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("Todos/{id?}")]
        public IActionResult GetTodo(Guid id)
        {
            var todo = _todoRepository.GetTodoByID(id);

            if (todo == null)
            {
                return UnprocessableEntity();
            }

            return Ok(todo);
        }

        [HttpPost("Todos")]
        [Consumes("application/json")]
        public ActionResult PostTodo([FromBody] Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity();
            }

            _todoRepository.InsertTodo(todo);

            return Ok();
        }

        [HttpPut("Todos")]
        [Consumes("application/json")]
        public ActionResult PutTodos([FromBody] Todo todo)
        {
            if (!ModelState.IsValid || !IsUpdateValid(todo))
            {
                return UnprocessableEntity();
            }

            _todoRepository.UpdateTodo(todo);

            if (todo.ParentId != null)
            {
                var parentTodo = _todoRepository.GetTodoByID((Guid)todo.ParentId);
                CheckAndMarkParentTodoComplete(parentTodo);
            }
            else
            {
                CheckAndMarkChildTodosComplete(todo);
            }

            return Ok();
        }

        [HttpDelete("Todos/{id?}")]
        public ActionResult Delete(Guid id)
        {
            var todo = _todoRepository.GetTodoByID(id);

            if (todo == null)
            {
                return UnprocessableEntity();
            }

            _todoRepository.DeleteTodo(id);

            if (todo.ParentId == null)
            {
                var children = _todoRepository.GetTodos(x => x.ParentId == id).ToList();

                foreach (var child in children)
                {
                    _todoRepository.DeleteTodo(child.Id);
                }
            } else {
                var parentTodo = _todoRepository.GetTodoByID((Guid)todo.ParentId);
                CheckAndMarkParentTodoComplete(parentTodo);
            }

            return Ok();
        }

        private bool IsUpdateValid(Todo todo)
        {
            var isValid = true;
            if (_todoRepository.GetTodoByID(todo.Id) == null)
                isValid = false;
            if (todo.ParentId != null && _todoRepository.GetTodos(x => x.ParentId == todo.Id).Count() > 0)
                isValid = false;

            return isValid;
        }

        private void CheckAndMarkParentTodoComplete(Todo parentTodo)
        {
            var children = _todoRepository.GetTodos(x => x.ParentId == parentTodo.Id);

            if (children.Any() & children.All(x => x.IsComplete))
            {
                parentTodo.IsComplete = true;
                _todoRepository.UpdateTodo(parentTodo);
            }
        }

        private void CheckAndMarkChildTodosComplete(Todo parentTodo)
        {
            var children = _todoRepository.GetTodos(x => x.ParentId == parentTodo.Id && !x.IsComplete).ToList();

            foreach (var child in children)
            {
                child.IsComplete = true;
                _todoRepository.UpdateTodo(child);
            }
        }
    }
}
