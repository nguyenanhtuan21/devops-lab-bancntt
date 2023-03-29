using BL.BaseBL;
using Core.Entities;
using DL.DepartmentsDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DepartmentsBL
{
    public class DepartmentsBL : BaseBL<Departments>, IDepartmentsBL
    {
        #region Field

        private readonly IDepartmentsDL _departmentsDL;
        #endregion

        #region Constructor

        public DepartmentsBL(IDepartmentsDL departmentsDL) : base(departmentsDL)
        {
            _departmentsDL = departmentsDL;
        }
        #endregion
        #region Override

        #endregion
    }
}
