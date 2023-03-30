using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;
using Library.Entities.param;

namespace ApplicationCore.Interfaces.BL
{
  public interface IBLProject : IBLBase<Project>
  {
    bool InviteMember(ParamInviteUser param);
    bool RemoveMember(ParamInviteUser param);
    Dictionary<string, object> GetReport(ParamReport param);
    List<Dictionary<string, object>> GetProgressReport(ParamReport param);
    Dictionary<string, object>  GetAssignedReport(ParamReport param);
  }
}
