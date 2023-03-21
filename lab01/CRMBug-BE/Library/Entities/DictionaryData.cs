using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
  public class DictionaryData : BaseEntity
  {
    public long ID { get; set; }
    public int DictionaryID { get; set; }
    public int Value { get; set; }
    public string Text { get; set; }
    public bool Active { get; set; }
    public int SortOrder { get; set; }

  }
}
