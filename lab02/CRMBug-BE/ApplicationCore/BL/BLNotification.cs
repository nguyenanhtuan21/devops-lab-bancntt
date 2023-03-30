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
  public class BLNotification : BLBase<Notification>, IBLNotification
  {
    #region DECLARE
    IDLNotification DLNotification;
    #endregion

    #region CONSTRUCTOR
    public BLNotification(IDLNotification dlNotification) : base(dlNotification)
    {
      DLNotification = dlNotification;
    }
    #endregion

    #region Overrides
    protected override string CustomJoinClause()
    {
      string join = " JOIN project p ON p.ID = T.ProjectID";
      return join;
    }

    protected override string CustomColumns()
    {
      return "p.ProjectName,p.ProjectCode";
    }

    protected override void CustomWhereClause(ref string oWhere, List<FilterField> filterFields)
    {
      base.CustomWhereClause(ref oWhere, filterFields);
      var employeeID = filterFields.Where(x => x.FieldName == "ToUserID")?.First()?.Value;
      if (employeeID != null)
      {
        oWhere += $" AND (T.LayoutCode IN ('Project', 'Task') OR (T.LayoutCode = 'RemindTask' AND  T.ToUserID = '{employeeID}'))";
      }
    }
    #endregion
  }
}
