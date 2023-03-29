var EmployeeStore = EmployeeStore || {};

EmployeeStore = {
    Base: `https://localhost:44358/api/v1/Employees`,
    Filter:(pageSize, pageNumber, employeeFilter, sortBy) => `https://localhost:44358/api/v1/Employees/Fillter?pageSize=${pageSize}&pageNumber=${pageNumber}&employeeFilter=${employeeFilter}&sortBy=${sortBy}`,
    NewCode: "https://localhost:44358/api/v1/Employees/NewEmployeeCode",
    Export:(filter) => `https://localhost:44358/api/v1/Employees/Export?filter=${filter}`,
    DeleteMultiple: `https://localhost:44358/api/v1/Employees/Multiple`,
    Delete: (id="") => `https://localhost:44358/api/v1/Employees/${id}`
}

export default EmployeeStore