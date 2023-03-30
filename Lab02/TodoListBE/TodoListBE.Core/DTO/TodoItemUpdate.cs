using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoListBE.Core.DTO
{
    public class TodoItemUpdate
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
    }
}
