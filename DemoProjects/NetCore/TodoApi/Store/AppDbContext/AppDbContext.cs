using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using TodoApi.Store.AppDbContext.Entities;
using Microsoft.Extensions.Logging;
using TodoApi.Shared;
using System;

namespace TodoApi.Store.AppDbContext
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        private readonly ILogger<AppDbContext> _logger;
        private static int _instanceCount = 0;

        public AppDbContext(DbContextOptions<AppDbContext> options, ILogger<AppDbContext> logger)
            : base(options)
        {
            // This actually creates and initializes the database.
            Database.EnsureCreated();

            _logger = logger;

            _logger.LogInformation($"############ Made an instance of AppDbContext (instance #{++_instanceCount})");
            _logger.LogInformation($"############ Table Todo has {Todo.CountAsync().Result} records.)");
        }

        public DbSet<Todo> Todo{ get; set; }

        public DbSet<Step> Steps { get; set; }

        public bool CommitChanges()
        {
            return (SaveChanges() >= 0);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>().Property(obj => obj.Name)
                .IsRequired()
                .HasMaxLength(200);
            modelBuilder.Entity<Todo>().Property(obj => obj.IsComplete)
                .HasDefaultValue(false);
            modelBuilder.Entity<Todo>().Property(obj => obj.IsBlocked)
                .HasDefaultValue(false);
            modelBuilder.Entity<Todo>().Property(obj => obj.Status)
                .HasDefaultValue(TodoStatus.ReadyToBegin);
            modelBuilder.Entity<Todo>().Property(obj => obj.IsActive)
                .HasDefaultValue(true);
            modelBuilder.Entity<Todo>().Property(obj => obj.DateCreated)
                .IsRequired();
            modelBuilder.Entity<Todo>().Property(obj => obj.DateLastChanged)
                .IsRequired();
        }
    }
}