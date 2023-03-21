using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationCore.Interfaces.BL;
using BugTracking.API.Base;
using Library.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BugTracking.API.Comments
{
  public class CommentController : BaseApiController<Comment>
  {
    #region DECLARE
    IBLComment BL;
    #endregion
    #region CONSTRUCTOR
    public CommentController(IBLComment BLComment) : base(BLComment)
    {
      BL = BLComment;
    }
    #endregion

    #region APIs

    #endregion
  }
}
