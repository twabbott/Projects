using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public class TodoModel
    {
        public long Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [Range(100, 200)]
        public int MagicNumber { get; set; }

        [Required]
        public bool IsComplete { get; set; }

        public ICollection<StepModel> Steps { get; set; } = new List<StepModel>();

        [Required]
        public bool IsBlocked { get; set; }

        public DateTime LastChangedDate { get; set; }

        [Required]
        public TodoApi.Shared.TaskStatus Status { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}
