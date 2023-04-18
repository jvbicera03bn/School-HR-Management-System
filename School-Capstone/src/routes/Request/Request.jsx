import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import moment from "moment"
import DataTable from 'react-data-table-component'

export const Request = () => {
    const { cookies, baseUrl } = useContext(AuthContext);
    const [employeeList, setEmployeeList] = useState()
    const [updateTable, setupdateTable] = useState(false);
    const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
    function status(status) {
        if (status == "Approved") {
            return "status_approve"
        } else if (status == "Rejected") {
            return "status_reject"
        } else {
            return "status_review"
        }
    }
    function onReject(id) {
        axios.request({
            method: 'put',
            maxBodyLength: Infinity,
            url: `${baseUrl}/request/rejectRequest`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": `Bearer ${cookies.jwtToken}`
            },
            data: {
                'document_id': id
            }
        })
            .then((response) => {
                console.log(response)
                swal({
                    icon: 'success',
                    title: 'Succes',
                    text: 'Document Rejected!',
                })
                setupdateTable(!updateTable)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function onApprove(id) {
        axios.request({
            method: 'put',
            maxBodyLength: Infinity,
            url: `${baseUrl}/request/acceptRequest`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": `Bearer ${cookies.jwtToken}`
            },
            data: {
                'document_id': id
            }
        })
            .then((response) => {
                console.log(response)
                swal({
                    icon: 'success',
                    title: 'Succes',
                    text: 'Document Approved!',
                })
                setupdateTable(!updateTable)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const columns = [
        {
            name: "Full Name",
            selector: row => uppercaseWords(row.fullName),
            sortable: true,
            center: true,
        },
        {
            name: "Request Type",
            selector: row => uppercaseWords(row.requestType),
            center: true,
            sortable: true
        },
        {
            name: "Number of Days",
            selector: row => uppercaseWords(row.numberOfDays),
            center: true,
            sortable: true
        },
        {
            name: "View Document",
            selector: row => <a className="DocLink" href={`https://${row.viewLink}`}>View Document</a>,
            center: true,
            sortable: true
        },
        {
            name: "Status",
            selector: row => <strong className={status(row.status)}>{uppercaseWords(row.status)}</strong>,
            sortable: true,
            center: true,
        },
        {
            name: "Date Uploaded",
            selector: row => moment(row.createdAt).format('MMMM, D, YYYY'),
            center: true,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => {
                const { document_id } = row
                return (
                    <div className='tableAction'>
                        <button className="approve" onClick={() => { onApprove(document_id) }}>
                            <span className="material-symbols-outlined">
                                done
                            </span>
                        </button>
                        <button className="reject" onClick={() => { onReject(document_id) }}>
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
    function handleChange(e) {
        setfilterString(e.target.value)
        setFilteredList(filterByValue(employeeList, e.target.value))
    }

    useEffect(() => {
        axios.get(`${baseUrl}/request/getRequest`, {
            headers: {
                "Authorization": `Bearer ${cookies.jwtToken}`
            }
        }).then((response) => {
            console.log(response.data)
            setEmployeeList(response.data.map((request) => ({
                "fullName": ` ${request.employee_id.firstName} ${request.employee_id.middleName} ${request.employee_id.lastName}`,
                "reqMessage": ` ${request.requestMessage}`,
                "requestType": ` ${request.requestType}`,
                "numberOfDays": ` ${request.numberOfDays}`,
                "createdAt": ` ${request.createdAt}`,
                "viewLink": `${request.requestType}${request.employee_id.lastName}`,
                "status": `${request.status}`,
                "document_id": `${request._id}`,
            })
            ))
        })
    }, [cookies, updateTable]);
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
                    />
                </div>
            </div>
        </div>
    )
}