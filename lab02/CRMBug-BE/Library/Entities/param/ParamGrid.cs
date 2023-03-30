using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
  public class ParamGrid
  {
    public List<FilterField> Filters { get; set; }
    public int PageSize { get; set; }
    public int PageIndex { get; set; }
    public string Columns { get; set; }
    public string Formula { get; set; }
  }
}
