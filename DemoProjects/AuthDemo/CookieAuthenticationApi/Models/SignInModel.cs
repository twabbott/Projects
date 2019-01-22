using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CookieAuthenticationApi.Models
{
    public class SignInModel
    {
        [Required(ErrorMessage = "Username property not set.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password property not set.")]
        public string Password { get; set; }
    }
}
