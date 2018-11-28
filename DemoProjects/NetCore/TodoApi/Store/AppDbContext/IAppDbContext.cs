using Microsoft.EntityFrameworkCore;
using TodoApi.Store.AppDbContext.Entities;

namespace TodoApi.Store.AppDbContext
{
    public interface IAppDbContext
    {
        DbSet<Todo> Todo { get; set; }

        DbSet<Step> Steps { get; set; }

        bool CommitChanges();
    }
}
