using Common.Entity;
using BusinessLogic.BaseBL;
using DataLayer.TaskDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.TaskBL
{
    public class TaskBL : BaseBL<TaskEntity>, ITaskBL
    {
        private readonly ITaskDL _taskDL;
        public TaskBL(ITaskDL taskDL) : base(taskDL)
        {
            _taskDL = taskDL;
        }
    }
}
