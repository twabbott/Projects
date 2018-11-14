using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Store.AppDbContext.Entities
{
    public class Todo
    {
        [Key] // Not required (EFC will automatically select "Id" to be the PK)
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string Name { get; set; }

        public bool IsComplete { get; set; }
        
        public ICollection<Step> Steps { get; set; } = new List<Step>();

        public bool IsBlocked { get; set; }

        public TodoApi.Shared.TodoStatus Status { get; set; }

        public bool IsActive { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateLastChanged { get; set; }

        public DateTime? DateCompleted { get; set; }
    }
}
