using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using TodoApi.Store.Entities;
using Microsoft.Extensions.Logging;

namespace TodoApi.Store.Contexts
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        private readonly ILogger<AppDbContext> _logger;
        private static bool _isInitialized = false;
        private static int _instanceCount = 0;

        public AppDbContext(DbContextOptions<AppDbContext> options, ILogger<AppDbContext> logger)
            : base(options)
        {
            _logger = logger;

            _logger.LogInformation($"############ Made an instance of AppDbContext (instance #{++_instanceCount})");
            _logger.LogInformation($"############ Table Todo has {Todo.CountAsync().Result} records.)");

            if (Startup.HostEnvironment.IsDevelopment() && !_isInitialized)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                Todo.Add(new Todo { Name = "Bathe the cat." });
                Todo.Add(new Todo { Name = "Feed the fish." });
                Todo.Add(new Todo { Name = "Goof off." });
                Todo.Add(new Todo { Name = "Sky divin'." });
                Todo.Add(new Todo { Name = "Rocky Mountain climbin'." });
                Todo.Add(new Todo { Name = "Ride a bull named Fu Man Chu." });
                SaveChanges();

                _isInitialized = true;
            }
        }

        public DbSet<Todo> Todo{ get; set; }

        public DbSet<Step> Steps { get; set; }

        public void CommitChanges()
        {
            SaveChanges();
        }
    }
}