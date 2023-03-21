using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Library.Enumeration.Enumeration;

namespace Library.Entities
{
  [TableName("employee")]
  public class Employee : BaseEntity
  {
    #region Properties
    public long ID { get; set; }
    [TableColumn]
    public string EmployeeID { get; set; }
    [TableColumn]
    public string EmployeeCode { get; set; }
    [TableColumn]
    public string FirstName { get; set; }
    [TableColumn]
    public string LastName { get; set; }
    [TableColumn]
    public string FullName { get; set; }
    [TableColumn]
    public string Email { get; set; }
    [TableColumn]
    public string PhoneNumber { get; set; }
    [TableColumn]
    public int RoleID { get; set; } = (int)RoleEmployee.Guest;
    public string RoleIDText { get; set; }
    [Unique]
    [DisplayName("Username")]
    public string Username { get; set; }
    public string Password { get; set; }
    public string ConectionID { get; set; }
    #endregion
  }
}
