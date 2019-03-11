﻿using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using CookieAuthenticationApi.Models;
using CookieAuthenticationApi.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CookieAuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    public class SignInController : Controller
    {
        IUserService _userService;

        public SignInController(IUserService userService)
        {
            _userService = userService;
        }

        // POST: api/signin
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SignInModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user;
            if (await _userService.ValidateCredentials(model.Username, model.Password, out user))
            {
                await SignInUser(user.Username);
                return Ok();
            }

            ModelState.AddModelError("Password", "Invalid password");
            return BadRequest(ModelState);
        }

        // DELETE: api/signin/{userName}
        [HttpDelete]
        [Route("{userName}")]
        public async Task<IActionResult> Delete(string userName)
        {            
            if (
                string.IsNullOrWhiteSpace(userName) || 
                string.Compare(userName, User.Identity.Name, true) != 0)
            {
                return NotFound();
            }

            await SignOutUser();
            return NoContent();
        }

        private async Task SignInUser(string username)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, username),
                new Claim("name", username)
            };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme, "name", null);
            var principal = new ClaimsPrincipal(identity);

            // This is an extension method from Microsoft.AspNetCore.Authentication
            await HttpContext.SignInAsync(principal);
        }

        private async Task SignOutUser()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
