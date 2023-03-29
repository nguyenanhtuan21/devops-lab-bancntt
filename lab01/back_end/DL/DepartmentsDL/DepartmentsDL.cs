using Microsoft.Extensions.Configuration;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DL.BaseDL;
using DL.DepartmentsDL;

namespace DL.DepartmentsDL
{
    /// <summary>
    ///Department Data Access Layer
    /// </summary>
    public class DepartmentsDL : BaseDL<Departments>, IDepartmentsDL
    {
        #region Field
        private readonly string _conn;
        #endregion

        #region Constructor

        public DepartmentsDL() : base()
        {
            _conn = DatabaseContext.ConnectionStrings;
        }
        #endregion

        #region "Override"

        protected override void BeforeSaveAsyn(Departments entity)
        {
            entity.DepartmentID = Guid.NewGuid();
            entity.CreatedDate = DateTime.Now;
            base.BeforeSaveAsyn(entity);
        }
        #endregion
    }
}
