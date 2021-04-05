using System;
using System.ComponentModel.DataAnnotations;

namespace TodoList
{
    public class Todo
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        [Required]
        public string Task { get; set; }
        [Required]
        public string Deadline { get; set; }
        public bool IsComplete { get; set; }
        public string MoreDetails { get; set; }

        public Todo()
        {
            Id = Guid.NewGuid();
        }
    }
}
