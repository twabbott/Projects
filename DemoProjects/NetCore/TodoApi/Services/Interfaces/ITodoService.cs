using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Services.Interfaces
{
    public interface ITodoService
    {
        IEnumerable<TodoModel> Read();

        TodoModel Read(long id);

        TodoModel Create(TodoModel newItem);

        TodoModel Update(long id, TodoModel item);

        bool Delete(long id);
    }
}
