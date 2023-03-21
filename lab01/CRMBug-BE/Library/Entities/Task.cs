using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
  /// <summary>
  /// Thông tin công việc
  /// </summary>
  /// Author: HHDang 23.2.2022
  [TableName("task")]
  public class Task : BaseEntity
  {
    #region Properties
    public long ID { get; set; }
    //[TableColumn]
    //public int TypeID { get; set; }
    //[TableColumn]
    //public string TypeIDText { get; set; }
    [TableColumn]
    [Required]
    [DisplayName("Task Subject")]
    public string Subject { get; set; }
    [TableColumn]
    public int PriorityID { get; set; }
    [TableColumn]
    public string PriorityIDText { get; set; }
    [TableColumn]
    public int StatusID { get; set; }
    [TableColumn]
    public string StatusIDText { get; set; }
    [TableColumn]
    public DateTime DueDate { get; set; }
    [TableColumn]
    public long AssignedUserID { get; set; }
    [TableColumn]
    public string AssignedUserIDText { get; set; }
    [TableColumn]
    public long RelatedUserID { get; set; }
    [TableColumn]
    public string RelatedUserIDText { get; set; }
    [TableColumn]
    public long ProjectID { get; set; }
    [TableColumn]
    public string Description { get; set; }
    [TableColumn]
    public int CompletedProgress { get; set; }
    [TableColumn]
    public string TaskCode { get; set; }
    [TableColumn]
    public string PriorityColor { get; set; }
    [TableColumn]
    public string StatusColor { get; set; }

    [TableColumn]
    public DateTime? CompletedDate { get; set; }
    #endregion
  }
}
