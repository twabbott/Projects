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
using TodoApi.Store.Contexts;

namespace TodoApi
{
    public class Startup
    {
        public static IHostingEnvironment HostEnvironment { get; private set; }

        public Startup(IConfiguration configuration)
        {
            // This is an object that represents the contents of appsettings.json
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("TodoList"));

            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddXmlSerializerFormatters()
                .AddFluentValidation();

            // Add all custom DI mappings for your services/etc. here
            services
                .AddTransient<IAppDbContext, AppDbContext>()
                .AddTransient<ITodoService, TodoService>()
                .AddTransient<IFilterService, FilterService>();

            // Add all validators here
            services
                .AddTransient<IValidator<TodoModel>, TodoValidator>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
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
            app.UseMvc();
        }
    }
}
