using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
  [TableName("notification")]
  public class Notification : BaseEntity
  {
    public long ID { get; set; }
    [TableColumn]
    public string Content { get; set; }
    [TableColumn]
    public string Config { get; set; }
    [TableColumn]
    public long ProjectID { get; set; }
    [TableColumn]
    public long? FromUserID { get; set; }
    [TableColumn]
    public long? ToUserID { get; set; }
    [TableColumn]
    public string LayoutCode { get; set; }
    [TableColumn]
    public string EventName { get; set; }
  }
}
