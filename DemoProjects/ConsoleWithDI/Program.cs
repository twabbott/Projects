using ConsoleWithDI.Interfaces;
using ConsoleWithDI.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;

namespace ConsoleWithDI
{
    class Program
    {
        static void Main(string[] args)
        {
            //setup our DI
            var serviceProvider = new ServiceCollection()
                .AddLogging(configuration => {
                    configuration.SetMinimumLevel(LogLevel.Debug);
                })
                .AddSingleton<IFooService, FooService>()
                .AddSingleton<IBarService, BarService>()
                .BuildServiceProvider();

            //configure console logging
            serviceProvider
                .GetService<ILoggingBuilder>()
                .AddConsole();

            var logger = serviceProvider.GetService<ILoggerFactory>()
                .CreateLogger<Program>();
            logger.LogDebug("Starting application");

            //do the actual work here
            var bar = serviceProvider.GetService<IBarService>();
            bar.DoSomeRealWork();

            logger.LogDebug("All done!");

            if (Debugger.IsAttached)
                Console.ReadKey();
        }
    }
}
