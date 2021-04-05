using System;
using System.Collections.Generic;

namespace TodoList
{
    public interface ITodoRepository
    {
        IEnumerable<Todo> GetTodos(Func<Todo, bool> filter = null);
        Todo GetTodoByID(Guid todoId);
        void InsertTodo(Todo todo);
        void DeleteTodo(Guid todoId);
        void UpdateTodo(Todo todo);
    }
}
