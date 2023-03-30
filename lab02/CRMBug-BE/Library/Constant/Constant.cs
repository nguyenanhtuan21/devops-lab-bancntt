using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Constant
{
  public class Constant
  {
    public const string DLBase_GetFormData = "SELECT dtt.* FROM {0}_dictionary_data dtt JOIN {0}_dictionary dt ON dt.ID = dtt.DictionaryID WHERE dt.FieldName = 'Type';SELECT dtt.* FROM {0}_dictionary_data dtt JOIN {0}_dictionary dt ON dt.ID = dtt.DictionaryID WHERE dt.FieldName = 'Priority';SELECT dtt.* FROM {0}_dictionary_data dtt JOIN {0}_dictionary dt ON dt.ID = dtt.DictionaryID WHERE dt.FieldName = 'State';";
    public const string DLBase_GenerateAutoNumber = "drop temporary table if exists tmp_sequece; create temporary table if not exists tmp_sequece ( ID int(11) primary key auto_increment, Prefix varchar(10), MaxLength smallint(4), CurrentValue bigint(20), Subfix varchar(20) ); insert into tmp_sequece(Prefix, MaxLength, CurrentValue, Subfix) select Prefix, MaxLength, CurrentValue , lpad(CurrentValue + 1, MaxLength, '0') AS Subfix from sequence where FieldName = '{0}'; select concat(Prefix, Subfix) from tmp_sequece ; UPDATE sequence SET CurrentValue = CurrentValue+1 where FieldName = '{0}';";
    public const string Schedule_GetData = "SELECT s.ID, t.ProjectID,t.ID AS TaskID, t.AssignedUserID, t.PriorityIDText, t.TaskCode, t.Subject, t.DueDate, e.Email FROM schedule s JOIN task t ON t.ID = s.TaskID JOIN employee e ON t.AssignedUserID = e.ID WHERE s.IsDeleted IS NOT TRUE AND t.DueDate BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 10 MINUTE) ORDER BY DueDate DESC LIMIT 5;";
    public const string DLTask_GetSumaryData = "SELECT (select count(ID) from task where StatusID = 1 and ProjectID = @ProjectID AND CreatedDate BETWEEN @FromDate AND @ToDate) AS Pending, (select count(ID) from task where StatusID = 2 and ProjectID = @ProjectID AND CreatedDate BETWEEN @FromDate AND @ToDate) AS Completed , (select count(ID) from task where StatusID = 3 and ProjectID = @ProjectID AND CreatedDate BETWEEN @FromDate AND @ToDate) AS CompletedLate;SELECT (select count(ID) from task where PriorityID = 1 and ProjectID = @ProjectID AND CreatedDate BETWEEN @FromDate AND @ToDate) AS Low, (select count(ID) from task where PriorityID = 2 and ProjectID = @ProjectID AND CreatedDate BETWEEN @FromDate AND @ToDate) AS Normal , (select count(ID) from task where PriorityID = 3 and ProjectID = @ProjectID AND CreatedDate BETWEEN @FromDate AND @ToDate) AS High;select count(ID) from task where ProjectID = @ProjectID AND CreatedDate BETWEEN @FromDate AND @ToDate;";
    public const string DLTask_GetDataRecentlyViewed = "select t.ID, t.TaskCode, t.Subject, t.Description, t.PriorityIDText, t.StatusIDText, t.PriorityColor, t.StatusColor, t.AssignedUserIDText, t.CreatedDate, t.CreatedBy, p.ID AS ProjectID, p.ProjectCode, p.ProjectName, p.OwnerID from task t join project p on t.ProjectID = p.ID where t.ID IN (@IDs);";
    public const string DLEmployee_GetRoleEmployee = "SELECT r.ID, r.RoleName, r.Description, rp.Permission, rp.LayoutCode FROM role r JOIN role_permission rp ON r.ID = rp.RoleID;";

    public const string Color_Grey = "#bbbbbb";
    public const string Color_Green = "#01B075";
    public const string Color_Red = "#fa383e";
  }
}
