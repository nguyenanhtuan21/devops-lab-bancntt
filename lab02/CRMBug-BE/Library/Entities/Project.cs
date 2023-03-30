using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;

namespace Library.Entities
{
  [TableName("project")]
  public class Project : BaseEntity
  {
    /// <summary>
    /// Khóa chính
    /// </summary>
    public long ID { get; set; }
    /// <summary>
    /// Tên dự án
    /// </summary>
    [TableColumn]
    [Required]
    [DisplayName("Project Name")]
    public string ProjectName { get; set; }
    /// <summary>
    /// Mã dự án
    /// </summary>
    [TableColumn]
    [Required]
    [Unique]
    [DisplayName("Project Code")]
    public string ProjectCode { get; set; }

  }
}
