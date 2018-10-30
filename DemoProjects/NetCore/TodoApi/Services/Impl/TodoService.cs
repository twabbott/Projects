using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;
using TodoApi.Services.Interfaces;
using TodoApi.Store.Contexts;
using TodoApi.Store.Entities;

namespace TodoApi.Services.Impl
{
    public class TodoService: ITodoService
    {
        IAppDbContext _context;

        public TodoService(IAppDbContext context)
        {
            _context = context;
        }

        public static Todo ModelToEntity(TodoModel model)
        {
            return new Todo()
            {
                Id = model.Id,
                Name = model.Name,
                IsComplete = model.IsComplete,
                IsBlocked = model.IsBlocked,
                LastChangedDate = model.LastChangedDate,
                Status = model.Status,
                IsActive = model.IsActive
            };
        }

        public static TodoModel EntityToModel(Todo todo)
        {
            return new TodoModel()
            {
                Id = todo.Id,
                Name = todo.Name,
                IsComplete = todo.IsComplete,
                IsBlocked = todo.IsBlocked,
                LastChangedDate = todo.LastChangedDate,
                Status = todo.Status,
                IsActive = todo.IsActive
            };
        }

        public List<TodoModel> Read()
        {
            return _context.Todo
                .Select(item => EntityToModel(item))
                .ToList();
        }

        public TodoModel Read(long id)
        {
            Todo todo = _context.Todo.Find(id);
            if (todo == null)
            {
                return null;
            }

            return EntityToModel(todo);
        }

        public TodoModel Create(TodoModel newItem)
        {
            Todo todo = ModelToEntity(newItem);

            _context.Todo.Add(todo);
            _context.CommitChanges();

            newItem.Id = todo.Id;

            return newItem;
        }

        public TodoModel Update(long id, TodoModel item)
        {
            Todo todo = _context.Todo.Find(id);
            if (todo == null)
            {
                return null;
            }

            todo = ModelToEntity(item);
            todo.Id = item.Id = id;

            _context.Todo.Update(todo);
            _context.CommitChanges();

            return item;
        }

        public bool Delete(long id)
        {
            Todo todo = _context.Todo.Find(id);
            if (todo != null)
            {
                _context.Todo.Remove(todo);
                _context.CommitChanges();
            }

            return todo != null;
        }
    }
}
