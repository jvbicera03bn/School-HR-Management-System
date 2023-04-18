import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../../context/AuthContext"
import axios from 'axios'
import DataTable from 'react-data-table-component'


export const SetAttendance = () => {
  const { cookies, baseUrl } = useContext(AuthContext);
  const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
  const [employeeList, setEmployeeList] = useState()
  const columns = [
    {
      name: "ID Number",
      selector: row => uppercaseWords(row.idNumber),
      center: true,
      sortable: true
    },
    {
      name: "First Name",
      selector: row => uppercaseWords(row.firstName),
      center: true,
      sortable: true
    },
    {
      name: "Middle Name",
      selector: row => uppercaseWords(row.middleName),
      center: true,
      sortable: true
    },
    {
      name: "Last Name",
      selector: row => uppercaseWords(row.lastName),
      center: true,
      sortable: true
    },
    {
      name: "Time-In",
      selector: row => uppercaseWords(row.schoolDepartment),
      center: true,
      sortable: true
    },
    {
      name: "Time-Out",
      selector: row => uppercaseWords(row.employeeStatus),
      center: true,
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
            onSelectedRowsChange={onSelect}
          />
        </div>
      </div>
    </div>
  )
}
