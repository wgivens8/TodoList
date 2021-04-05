using System;
using System.Collections.Generic;
using System.Linq;

namespace TodoList
{
    public class TodoRepository : ITodoRepository
    {
        private List<Todo> context;

        public TodoRepository() {
            context = new List<Todo>();
        }

        public Todo GetTodoByID(Guid todoId)
        {
            return context.FirstOrDefault(x => x.Id == todoId);
        }

        public IEnumerable<Todo> GetTodos(Func<Todo, bool> filter = null)
        {
            if (filter == null)
                return context;

            return context.Where(filter);
        }

        public void InsertTodo(Todo todo)
        {
            context.Add(todo);
        }

        public void UpdateTodo(Todo todo)
        {
            var current = context.Where(x => x.Id == todo.Id).FirstOrDefault();

            if (current != null)
            {
                context.Remove(current);
                context.Add(todo);
            }
        }

        public void DeleteTodo(Guid todoId)
        {
            context.RemoveAll(x => x.Id == todoId);
        }
    }
}
