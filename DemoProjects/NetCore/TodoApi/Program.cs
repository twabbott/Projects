using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace TodoApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args)
                .Build() // Builds an IWebHost instance, which will host our app
                .Run();  // Runs the web app and blocks the calling thread until the app is shut down.
        }


        /// <summary>
        ///     This lambda is used by the tooling.  YOU NEED TO DO IT LIKE THIS, because
        ///     otherwise the tooling won't work right (whatever that means).
        /// </summary>
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)  // Creates a new IWebHostBuilder instance with some pre-configured defaults.
                .UseStartup<Startup>();         // A startup class to use, which is an entry point for the app.
    }
}
