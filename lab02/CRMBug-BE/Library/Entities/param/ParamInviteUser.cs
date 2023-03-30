using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities.param
{
  public class ParamInviteUser
  {
    public List<long> UserIDs { get; set; }
    public long ProjectID { get; set; }
  }
}
