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

        public string Name { get; set; }

        public int MagicNumber { get; set; }

        public bool IsComplete { get; set; }

        public ICollection<StepModel> Steps { get; set; } = new List<StepModel>();

        public bool IsBlocked { get; set; }

        public DateTime LastChangedDate { get; set; }

        public TodoApi.Shared.TaskStatus Status { get; set; }

        public bool IsActive { get; set; }
    }
}
