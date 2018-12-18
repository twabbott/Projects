
using Microsoft.Extensions.Logging;

using ConsoleWithDI.Interfaces;

namespace ConsoleWithDI.Services
{
    public class FooService: IFooService
    {
        private readonly ILogger<FooService> _logger;
        public FooService(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<FooService>();
        }

        public void DoSomething(int number)
        {
            _logger.LogInformation($"Doing the thing {number}");
        }
    }
}