using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Library.Enumeration.Enumeration;

namespace Library.Entities
{
  public class FilterField
  {
    public string FieldName { get; set; }
    public object Value { get; set; }
    public Operator Operator { get; set; }
    public Addition Addition { get; set; }
    public bool IsFormula { get; set; }
    public bool IsAllowEmpty { get; set; }
    public object Value1 { get; set; }
    public object Value2 { get; set; }
  }
}
