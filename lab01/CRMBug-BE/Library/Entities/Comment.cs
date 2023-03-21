using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
  [TableName("comment")]
  [ViewNameAttribute("view_comment")]
  public class Comment : BaseEntity
  {
    public long ID { get; set; }
    [TableColumn]
    public long TaskID { get; set; }
    [TableColumn]
    public long OwnerID { get; set; }
    [TableColumn]
    public string Content { get; set; }
    public string FullName { get; set; }
    public string FirstCharacter { get; set; }
  }
}
