import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../../context/AuthContext"
import axios from 'axios'
import DataTable from 'react-data-table-component'


export const SetAttendance = () => {
  const { cookies, baseUrl } = useContext(AuthContext);
  const [employeeList, setEmployeeList] = useState()
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
      name: "Time-In",
      selector: row => row.schoolDepartment,
      sortable: true
    },
    {
      name: "Time-Out",
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
  function onSelect({ selectedRows }) {
    console.log(selectedRows)
  }
  useEffect(() => {
    axios.get(`${baseUrl}/user/users`, {
      headers: {
        "Authorization": `Bearer ${cookies.jwtToken}`
      }
    }).then((response) => {
      setEmployeeList(response.data.users.map((user) => ({
        "idNumber": ` ${user.IDNumber}`,
        "firstName": `${user.firstName}`,
        "middleName": `${user.middleName}`,
        "lastName": `${user.lastName}`,
        "schoolDepartment": `${user.department}`,
        "employeeStatus": `${user.employeeStatus}`,
        "User_ID": `${user._id}`
      })
      ))
    })
  }, [cookies]);
  return (
    <div className='listOfEmployee'>
      <div className="table_contaner">
        <div className="title_bar">
          <h1>Attendance</h1>
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
            selectableRows
            onSelectedRowsChange={onSelect}
          />
        </div>
      </div>
    </div>
  )
}
