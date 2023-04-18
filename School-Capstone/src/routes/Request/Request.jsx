import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import moment from  "moment"
import DataTable from 'react-data-table-component'

export const Request = () => {
    const { cookies, baseUrl } = useContext(AuthContext);
    const [employeeList, setEmployeeList] = useState()
    const columns = [
        {
            name: "Full Name",
            selector: row => row.fullName,
            sortable: true,
            center:true,
        },
        {
            name: "Request Type",
            selector: row => row.requestType,
            center:true,
            sortable: true
        },
        {
            name: "Number of Days",
            selector: row => row.numberOfDays,
            center:true,
            sortable: true
        },
        {
            name: "View Document",
            selector: row => <a className="DocLink" href={`https://${row.viewLink}`}>View Document</a>,
            center:true,
            sortable: true
        },
        {
            name: "Date Uploaded",
            selector: row => moment(row.createdAt).format('MMMM, D, YYYY'),
            center:true,
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
        axios.get(`${baseUrl}/request/getRequest`, {
            headers: {
                "Authorization": `Bearer ${cookies.jwtToken}`
            }
        }).then((response) => {
            setEmployeeList(response.data.map((request) => ({
                "fullName": ` ${request.employee_id.firstName} ${request.employee_id.middleName} ${request.employee_id.lastName}`,
                "reqMessage": ` ${request.requestMessage}`,
                "requestType": ` ${request.requestType}`,
                "numberOfDays": ` ${request.numberOfDays}`,
                "createdAt": ` ${request.createdAt}`,
                "viewLink": `${request.requestType}${request.employee_id.lastName}`,
                "status": `${request.status}`,
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
                        
                        onSelectedRowsChange={onSelect}
                    />
                </div>
            </div>
        </div>
    )
}