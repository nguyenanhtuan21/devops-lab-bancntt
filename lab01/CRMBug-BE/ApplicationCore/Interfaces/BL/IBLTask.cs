using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Library.Entities;
using Library.Entities.param;

namespace ApplicationCore.Interfaces.BL
{
  public interface IBLTask : IBLBase<Task>
  {
    Dictionary<string, object> GetFormData(long projectID, long masterID, int formModeState);

    /// <summary>
    /// Phương thức lấy thông tin tóm lược về công việc trong dự án
    /// </summary>
    /// <param name="projectID">ID dự án</param>
    /// <returns></returns>
    Dictionary<string, object> GetSummaryData(ParamReport param);

    /// <summary>
    /// Phương thức lấy thông tin các công việc được xem gần đây
    /// </summary>
    /// <param name="taskIDs">danh sách ID công việc</param>
    /// <returns></returns>
    List<Dictionary<string, object>> GetDataRecentlyViewed(List<long> taskIDs);
  }
}
