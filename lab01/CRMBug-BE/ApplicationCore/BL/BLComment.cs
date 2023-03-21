using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationCore.Interfaces.BL;
using ApplicationCore.Interfaces.DL;
using Library.Entities;

namespace ApplicationCore.BL
{
  public class BLComment : BLBase<Comment>, IBLComment
  {
    #region DECLARE
    IDLComment DLComent;
    #endregion

    #region CONSTRUCTOR
    public BLComment(IDLComment dlComment) : base(dlComment)
    {
      DLComent = dlComment;
    }
    #endregion

    #region Methods
    #endregion
  }
}
