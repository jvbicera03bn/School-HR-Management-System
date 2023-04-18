import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"
import axios from 'axios'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import swal from "sweetalert"

export const Requirements = () => {

    const { cookies, baseUrl } = useContext(AuthContext);
    const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
    const [updateTable, setupdateTable] = useState(false);
    const [documentList, setDocumentList] = useState()
    function onReject(id) {
        axios.request({
            method: 'put',
            maxBodyLength: Infinity,
            url: `${baseUrl}/requirements/approveDocument`,
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
            url: `${baseUrl}/requirements/rejectDocument`,
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
    function status(status) {
        if (status == "Approved") {
            return "status_approve"
        } else if (status == "Rejected") {
            return "status_reject"
        } else {
            return "status_review"
        }
    }
    const columns = [
        {
            name: "Full Name",
            selector: row => uppercaseWords(row.fullName),
            sortable: true,
            center: true,
        },
        {
            name: "Document Type",
            selector: row => uppercaseWords(row.documentType),
            sortable: true,
            compact: true,
            width: "70px",
            center: true
        },
        {
            name: "Document View",
            cell: (row) => <a className='DocLink' href={row.documentLink}>View Requirement</a>,
            sortable: true,
            center: true
        },
        {
            name: "Status",
            selector: row => <strong className={status(row.status)}>{uppercaseWords(row.status)}</strong>,
            sortable: true,
            center: true,
        },
        {
            name: "Date & Time",
            selector: row => uppercaseWords(row.date_time),
            sortable: true,
            compact: true,
            center: true,
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
    function handleChange(e) {
        setfilterString(e.target.value)
        setFilteredList(filterByValue(documentList, e.target.value))
    }
    useEffect(() => {
        axios.get(`${baseUrl}/requirements/getDocuments`, {
            headers: {
                "Authorization": `Bearer ${cookies.jwtToken}`
            }
        }).then((response) => {
            console.log(response.data)
            setDocumentList(response.data.map((document) => ({
                "document_id": `${document._id}`,
                "fullName": `${document.employee_id.firstName} ${document.employee_id.middleName} ${document.employee_id.lastName}`,
                "documentLink": `${document.documentLink}`,
                "documentType": `${document.documentType}`,
                "status": `${document.status.charAt(0).toUpperCase() + document.status.slice(1)}`,
                "date_time": `${moment(document.createdAt).format('MMMM Do YYYY')}`
            })
            ))
        })
    }, [cookies, updateTable]);
    return (
        <div className='listOfEmployee'>
            <div className="table_contaner">
                <div className="title_bar">
                    <h1>Requirements</h1>
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
                        data={filteredList ? filteredList : documentList}
                        fixedHeaderScrollHeight="100%"
                        fixedHeader='true'
                    /* selectableRows
                    onSelectedRowsChange={onSelect} */
                    />
                </div>
            </div>
        </div>
    )
}
