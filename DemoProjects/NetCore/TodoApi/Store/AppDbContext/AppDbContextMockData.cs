using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Store.AppDbContext.Entities;

namespace TodoApi.Store.AppDbContext
{
    public static class AppDbContextMockData
    {
        public static void AddMockData(this IAppDbContext dbContext)
        {
            int count = dbContext.Todo.Count();
            if (count > 0)
            {
                return;
            }

            // Create a new TodoItem if collection is empty,
            // which means you can't delete all TodoItems.
            dbContext.Todo.Add(new Todo { Name = "Bathe the cat." });
            dbContext.Todo.Add(new Todo { Name = "Feed the fish." });
            dbContext.Todo.Add(new Todo { Name = "Goof off." });
            dbContext.Todo.Add(new Todo { Name = "Sky divin'." });
            dbContext.Todo.Add(new Todo { Name = "Rocky Mountain climbin'." });
            dbContext.Todo.Add(new Todo { Name = "Ride a bull named Fu Man Chu." });

            dbContext.CommitChanges();
        }
    }
}
