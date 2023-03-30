using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationCore.Interfaces.DL;
using Infarstructure.Base;
using Library.Entities;
using Microsoft.Extensions.Configuration;

namespace Infarstructure.Notifications
{
  public class DLNotification : DLBase<Notification>, IDLNotification
  {
    #region Constructor
    public DLNotification(IConfiguration configuration) : base(configuration)
    {

    }
    #endregion
  }
}
