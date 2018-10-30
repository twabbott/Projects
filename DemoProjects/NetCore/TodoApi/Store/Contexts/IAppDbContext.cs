using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Store.Entities;

namespace TodoApi.Store.Contexts
{
    public interface IAppDbContext
    {
        DbSet<Todo> Todo { get; set; }

        DbSet<Step> Steps { get; set; }

        void CommitChanges();
    }
}
