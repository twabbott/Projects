using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Store.AppDbContext.Entities;

namespace TodoApi.Services.Interfaces
{
    public interface IFilterService
    {
        List<Todo> CurrentTasks();
    }
}
