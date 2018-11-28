using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Shared.Exceptions
{
    public class AppInstallationException : Exception
    {
        public AppInstallationException()
        {
        }

        public AppInstallationException(string msg)
            : base(msg)
        {
        }

        public AppInstallationException(string msg, params object[] args)
            : base(string.Format(msg, args))
        {
        }

        public AppInstallationException(string msg, Exception innerException)
            : base(msg, innerException)
        {
        }
    }
}
