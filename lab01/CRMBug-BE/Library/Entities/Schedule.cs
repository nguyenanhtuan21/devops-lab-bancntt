using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
  public class Schedule : BaseEntity
  {
    public long ID { get; set; }
    [TableColumn]
    public long TaskID { get; set; }
    [TableColumn]
    public bool IsDeleted { get; set; }
    [TableColumn]
    public long ProjectID { get; set; }
  }
}
