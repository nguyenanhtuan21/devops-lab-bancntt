using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationCore.Interfaces.DL;
using Infarstructure.Base;
using Library.Entities;
using Microsoft.Extensions.Configuration;

namespace Infarstructure.Comments
{
  public class DLComment : DLBase<Comment>, IDLComment
  {
    #region Constructor
    public DLComment(IConfiguration configuration) : base(configuration)
    {

    }
    #endregion

    #region Methods
    #endregion
  }
}
