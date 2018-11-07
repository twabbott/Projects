﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Store.AppDbContext.Entities;

using TodoApi.Store.AppDbContext;
using TodoApi.Services.Interfaces;

namespace TodoApi.Services.Impl
{
    public class FilterService: IFilterService
    {
        private IAppDbContext _dbContext;
        public FilterService(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Todo> CurrentTasks()
        {
            return _dbContext.Todo.Where(item => item.IsActive).ToList();
        }
    }
}
