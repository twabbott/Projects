using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models.Validators
{
    public class TodoValidator: AbstractValidator<TodoModel>
    {
        public TodoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(20).WithMessage("Name has max length of 200 characters.");
        }
    }
}
