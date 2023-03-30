using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
  public class Role : BaseEntity
  {
    public long ID { get; set; }
    public string RoleName { get; set; }
    public long Permission { get; set; }
    public string LayoutCode { get; set; }
    public string Description { get; set; }
  }
}
