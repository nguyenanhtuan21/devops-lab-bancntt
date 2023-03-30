using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;
using Library.Entities.param;

namespace ApplicationCore.Interfaces.DL
{
  public interface IDLProject : IDLBase<Project>
  {
    bool InviteMember(long projectID, List<long> userIDs);
    bool RemoveMember(long projectID, List<long> userIDs);
    bool DeleteDependance(long projectID);
    Dictionary<string, object> GetReport(ParamReport param);
    List<Dictionary<string, object>> GetProgressReport(ParamReport param);

    Dictionary<string, object> GetAssignedReport(ParamReport param);
  }
}
