using System;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using TodoApi.Models;
using TodoApi.Models.Validators;
using TodoApi.Services.Impl;
using TodoApi.Services.Interfaces;
using TodoApi.Shared.Exceptions;
using TodoApi.Store.AppDbContext;

namespace TodoApi
{
    public class Startup
    {
        /// <summary>
        ///     Initializes a new instance of the <see cref="Startup"/> class.
        /// </summary>
        ///
        /// <remarks>
        ///     This function gets called very first.  Nothing has been
        ///     initialized yet, so you can't depend on anything being
        ///     configured yet.
        /// </remarks>
        public Startup(IConfiguration configuration)
        {
            // This is an object that represents the contents of appsettings.json
            Configuration = configuration;
        }

        public static IHostingEnvironment HostEnvironment { get; private set; }

        public IConfiguration Configuration { get; }

        /// <summary>
        ///     ConfigureServices method
        /// </summary>
        ///
        /// <remarks>
        ///     Use this method to init all the DI for your app.
        /// </remarks>
        public void ConfigureServices(IServiceCollection services)
        {
            // Set up all your DB contexts here.
            string connectionString = Configuration["connection-string"];
            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new AppInstallationException("Connection string not found!");
            }

            services
                .AddDbContext<IAppDbContext, AppDbContext>(opt => opt.UseSqlServer(connectionString));

            // Call AddMvc() and add all the middleware / plugins here.
            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddXmlSerializerFormatters()
                .AddFluentValidation();

            // Add all custom DI mappings for your services/etc. here.  For more info
            // on lifetime, see this article: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-2.1#service-lifetimes
            services
                .AddScoped<ITodoService, TodoService>() // Data services should have a "Scoped" lifetime, not transient.
                .AddTransient<IFilterService, FilterService>();

            // FluentValidation config.  Add all validators here
            services
                .AddTransient<IValidator<TodoModel>, TodoValidator>();
        }

        /// <summary>
        ///     Configure method
        /// </summary>
        ///
        /// <remarks>
        ///     This method gets called last.  This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </remarks>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider host)
        {
            HostEnvironment = env; // cache this for later use (a bit of Tom code)

            loggerFactory.AddConsole();

            // IHostingEnvironment gets injected for us.  It contains all kinds of info about the
            // environment that our app is running under.  The IsDevelopment() method checks for a
            // system enviornment variable called ASPNETCORE_ENVIRONMENT, which can have three
            // values: Development, Staging, or Production.  You can set this var in Project
            // Properties, on the debug tab (it should already be set for you).
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseExceptionHandler();
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            // Do all your auto-mapper setup here.
            AutoMapper.Mapper.Initialize(cfg =>
            {
                // NOTE: mappings are unidirectional, so if you want it to go
                // both ways, you need to specify both.
                cfg.CreateMap<Store.AppDbContext.Entities.Todo, Models.TodoModel>();
                cfg.CreateMap<Models.TodoModel, Store.AppDbContext.Entities.Todo>();
            });

            app.UseMvc();

            if (HostEnvironment.IsDevelopment())
            {
                IAppDbContext appDbContext = host.GetRequiredService<IAppDbContext>();
                appDbContext.AddMockData();
            }
        }
    }
}
