using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;
using TodoApi.Store.AppDbContext.Entities;

namespace TodoApi
{
    public class AutoMapperProfile : Profile
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AutoMapperProfile"/> class.
        /// </summary>
        public AutoMapperProfile()
        {
            // All mappings are uni-directional, so if you need to map both ways
            // then you need to specify both mappings.
            CreateMap<TodoModel, Todo>();
            CreateMap<Todo, TodoModel>();

            CreateMap<StepModel, Step>();
            CreateMap<Step, StepModel>();
        }
    }
}
