using System;
using System.Collections.Generic;
using System.Linq;

using AutoMapper;
using TodoApi.Models;
using TodoApi.Services.Interfaces;
using TodoApi.Store.AppDbContext;
using TodoApi.Store.AppDbContext.Entities;

namespace TodoApi.Services.Impl
{
    public class TodoService : ITodoService
    {
        private IAppDbContext _context;

        public TodoService(IAppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<TodoModel> Read()
        {
            List<Todo> results = _context.Todo.ToList();

            return Mapper.Map<IEnumerable<TodoModel>>(results);
        }

        public TodoModel Read(long id)
        {
            Todo todo = _context.Todo.Find(id);
            if (todo == null)
            {
                return null;
            }

            return Mapper.Map<TodoModel>(todo);
        }

        public TodoModel Create(TodoModel newItem)
        {
            Todo todo = Mapper.Map<Todo>(newItem);

            // Force certain defaults:
            todo.IsComplete = false;
            todo.IsBlocked = false;
            todo.Status = Shared.TodoStatus.ReadyToBegin;
            todo.IsActive = true;
            todo.DateCreated = todo.DateLastChanged = DateTime.UtcNow;

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

            todo = todo = Mapper.Map<Todo>(item);
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
