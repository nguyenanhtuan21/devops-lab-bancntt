using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationCore.Interfaces.BL;
using BugTracking.API.Base;
using Library.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BugTracking.API.Notifications
{
  public class NotificationController : BaseApiController<Notification>
  {
    #region DECLARE
    IBLNotification BL;
    #endregion
    #region CONSTRUCTOR
    public NotificationController(IBLNotification BLNotification) : base(BLNotification)
    {
      BL = BLNotification;
    }
    #endregion

  }
}
