import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'


export const SetAttendance = () => {
  const [employeeList, setEmployeeList] = useState([
    {
      idNumber: "1001",
      firstName: "John",
      middleName: "Doe",
      lastName: "Smith",
      schoolDepartment: "Mathematics",
      employeeStatus: "Full-time"
    },
    {
      idNumber: "1002",
      firstName: "Jane",
      middleName: "Lee",
      lastName: "Johnson",
      schoolDepartment: "History",
      employeeStatus: "Part-time"
    },
    {
      idNumber: "1003",
      firstName: "David",
      middleName: "Michael",
      lastName: "Brown",
      schoolDepartment: "Science",
      employeeStatus: "Full-time"
    },
    {
      idNumber: "1004",
      firstName: "Sarah",
      middleName: "Ann",
      lastName: "Garcia",
      schoolDepartment: "Art",
      employeeStatus: "Part-time"
    },
    {
      idNumber: "1005",
      firstName: "Emily",
      middleName: "Grace",
      lastName: "Davis",
      schoolDepartment: "Music",
      employeeStatus: "Full-time"
    },
    {
      idNumber: "1006",
      firstName: "Christopher",
      middleName: "Paul",
      lastName: "Wilson",
      schoolDepartment: "Physical Education",
      employeeStatus: "Part-time"
    },
    {
      idNumber: "1007",
      firstName: "Stephanie",
      middleName: "Marie",
      lastName: "Rodriguez",
      schoolDepartment: "Foreign Languages",
      employeeStatus: "Full-time"
    },
    {
      idNumber: "1008",
      firstName: "Brandon",
      middleName: "Joseph",
      lastName: "Nguyen",
      schoolDepartment: "Computer Science",
      employeeStatus: "Part-time"
    },
    {
      idNumber: "1009",
      firstName: "Melissa",
      middleName: "Anne",
      lastName: "Kim",
      schoolDepartment: "English",
      employeeStatus: "Full-time"
    },
    {
      idNumber: "1010",
      firstName: "Jacob",
      middleName: "Tyler",
      lastName: "Martinez",
      schoolDepartment: "Social Studies",
      employeeStatus: "Part-time"
    },
    {
      idNumber: "1011",
      firstName: "Alyssa",
      middleName: "Nicole",
      lastName: "Hernandez",
      schoolDepartment: "Mathematics",
      employeeStatus: "Full-time"
    },
    {
      idNumber: "1012",
      firstName: "David",
      middleName: "William",
      lastName: "Kim",
      schoolDepartment: "Science",
      employeeStatus: "Part-time"
    },
    {
      idNumber: "1013",
      firstName: "Samantha",
      middleName: "Marie",
      lastName: "Smith",
      schoolDepartment: "Art",
      employeeStatus: "Full-time"
    },
    {
      idNumber: "1014",
      firstName: "Kevin",
      middleName: "Lee",
      lastName: "Davis",
      schoolDepartment: "Music",
      employeeStatus: "Part-time"
    },
    {
      idNumber: "1015",
      firstName: "Hannah",
      middleName: "Elizabeth",
      lastName: "Johnson",
      schoolDepartment: "Physical Education",
      employeeStatus: "Full-time"
    }])
  const columns = [
    {
      name: "ID Number",
      selector: row => row.idNumber,
      sortable: true
    },
    {
      name: "First Name",
      selector: row => row.firstName,
      sortable: true
    },
    {
      name: "Middle Name",
      selector: row => row.middleName,
      sortable: true
    },
    {
      name: "Last Name",
      selector: row => row.lastName,
      sortable: true
    },
    {
      name: "Department",
      selector: row => row.schoolDepartment,
      sortable: true
    },
    {
      name: "Employee Status",
      selector: row => row.employeeStatus,
      sortable: true
    },
  ]
  const [filteredList, setFilteredList] = useState()
  const [filterString, setfilterString] = useState();
  function filterByValue(array, string) {
    return array.filter(o =>
      Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
  }
  function handleChange(e) {
    setfilterString(e.target.value)
    setFilteredList(filterByValue(employeeList, e.target.value))
  }
  useEffect(() => {


  });
  return (
    <div className='listOfEmployee'>
      <div className="table_contaner">
        <div className="title_bar">
          <h1>Employee Attendance</h1>
          <input
            type="text"
            name="filterWord"
            value={filterString}
            onChange={handleChange}
            placeholder="Search...."
          />
        </div>
        <div className="employee_table">
          <DataTable
            columns={columns}
            data={filteredList ? filteredList : employeeList}
            fixedHeaderScrollHeight="100%"
            fixedHeader='true'
          />
        </div>
      </div>
    </div>
  )
}
