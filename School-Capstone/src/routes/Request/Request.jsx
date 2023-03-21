import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import DataTable from 'react-data-table-component'

export const Request = () => {
  const { cookies, baseUrl } = useContext(AuthContext);
  const [employeeList, setEmployeeList] = useState()
  const columns = [
    {
      name: "File Name",
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
      name: "Document Type",
      selector: row => row.schoolDepartment,
      sortable: true
    },
    {
      name: "Date Uploaded",
      selector: row => row.employeeStatus,
      sortable: true
    },
    {
      name: "Action",
      cell: (row) => {
        const { document_id } = row
        return (
          <div className='tableAction'>
            <button className="approve" onClick={() => { onReject(document_id) }}>
              <span className="material-symbols-outlined">
                done
              </span>
            </button>
            <button className="reject" onClick={() => { onApprove(document_id) }}>
              <span className="material-symbols-outlined">
                close
              </span>
            </button>
            {/*   <button className="reject" onClick={() => { onApprove(document_id) }}>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </button> */}
          </div>
        )
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]
  const [filteredList, setFilteredList] = useState()
  const [filterString, setfilterString] = useState();
  function filterByValue(array, string) {
    return array.filter(o =>
      Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
  }
  console.log(employeeList)
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
          <h1>Recent Request List</h1>
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
export const AnnouncementCarosel = () => {
  return (
    <div>
      
    </div>
  )
}