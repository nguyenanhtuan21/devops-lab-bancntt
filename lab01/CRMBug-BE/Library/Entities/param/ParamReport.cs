using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Library.Enumeration.Enumeration;

namespace Library.Entities.param
{
  public class ParamReport
  {
    public List<long> IDs { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public ViewReportType GroupBy { get; set; }
    public long ProjectID { get; set; }
  }
}
