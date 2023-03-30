using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
  public class JobData
  {
    public Guid JobId { get; set; }
    public Type JobType { get; }
    public string JobName { get; }
    public string CronExpression { get; }
    public JobData(Guid Id, Type jobType, string jobName, string cronExpression)
    {
      JobId = Id;
      JobType = jobType;
      JobName = jobName;
      CronExpression = cronExpression;
    }
  }
}
