using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationCore.BL;
using Library.Entities;

namespace ApplicationCore.Interfaces.BL
{
  public interface IBLAuth : IBLBase<Employee>
  {
    ServiceResult Authenticate(Employee user);

    ServiceResult SaveData(Employee user);
  }
}
