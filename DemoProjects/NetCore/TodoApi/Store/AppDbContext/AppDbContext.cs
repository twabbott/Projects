using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using TodoApi.Store.AppDbContext.Entities;
using Microsoft.Extensions.Logging;

namespace TodoApi.Store.AppDbContext
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        private readonly ILogger<AppDbContext> _logger;
        private static int _instanceCount = 0;

        public AppDbContext(DbContextOptions<AppDbContext> options, ILogger<AppDbContext> logger)
            : base(options)
        {
            _logger = logger;

            _logger.LogInformation($"############ Made an instance of AppDbContext (instance #{++_instanceCount})");
            _logger.LogInformation($"############ Table Todo has {Todo.CountAsync().Result} records.)");
        }

        public DbSet<Todo> Todo{ get; set; }

        public DbSet<Step> Steps { get; set; }

        public void CommitChanges()
        {
            SaveChanges();
        }
    }
}