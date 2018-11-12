using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TodoApi.Models;
using TodoApi.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ILogger<TodoController> _logger;
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService, ILogger<TodoController> logger)
        {
            _logger = logger;
            _todoService = todoService;
        }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult<List<TodoModel>> GetAll()
        {
            IEnumerable<TodoModel> list;
            try
            {
                list = _todoService.Read();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "Error getting all TODO items");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(list);
        }

        // GET api/<controller>/5
        [HttpGet(
            "{id}",          // URI route template
            Name = "GetTodo" // A name we can assign and re-use in an [HttpPost] handler
        )]
        public ActionResult<TodoModel> GetById(long id)
        {
            TodoModel item = null;
            try
            {
                item = _todoService.Read(id);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, $"Error getting TODO items with id={id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult Create(TodoModel item)
        {
            try
            {
                _todoService.Create(item);
            }
            catch (Exception ex)
            {
                // TODO: log failure
                _logger.LogCritical(ex, $"Error creating new TODO item.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return CreatedAtRoute(
                "GetTodo",            // The name of a route we created earlier
                new { id = item.Id }, // A data object to fill in the "GetTodo" route
                item                  // The new item that was created, which goes in the response body.
            );
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Update(long id, TodoModel item)
        {
            try
            {
                _todoService.Update(id, item);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, $"Error updating TODO item with id={id}.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(item);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            bool found = false;
            try
            {
                found = _todoService.Delete(id);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, $"Error deleting TODO item with id={id}.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            if (found)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
