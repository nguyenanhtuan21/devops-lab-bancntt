using MISA.WEB07.CNTT2.LOI.Core.Entities;

namespace MISA.WEB07.CNTT2.LOI.Application.Interfaces
{
    public interface IDepartmentBL
    {
        IEnumerable<Departments> GetDepartments();
        Departments GetDepartment(Guid id);
        bool Insert(Departments department);
        bool Update(Guid id,Departments department);
        bool Delete(Guid id);
    }
}
