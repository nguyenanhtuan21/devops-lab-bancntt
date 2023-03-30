using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;

namespace ApplicationCore.Interfaces.BL
{
  public interface IBLEmployee : IBLBase<Employee>
  {
    IEnumerable<Employee> GetEmployeeByProjectID(long projectID, bool isInProject);

    List<Dictionary<string, object>> GetAllRole();
  }
}
