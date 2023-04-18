import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { AuthContext } from "../../context/AuthContext"
import moment from "moment"
import axios from "axios"
import swal from "sweetalert"

const EMPRequirements = () => {
    const { userInfo, baseUrl, cookies } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [reqList, setReqList] = useState()
    const [newReq, setNewReq] = useState(0)
    const [filterString, setFilterString] = useState()
    const [filterList, setFilterList] = useState()
    const columns = [
        {
            name: "Requirement ID",
            selector: row => row._id,
            sortable: true,
            center: true
        },
        {
            name: "Document Name",
            selector: row => row.documentName,
            sortable: true,
            center: true
        },
        {
            name: "Document Type",
            selector: row => row.documentName,
            center: true,
            sortable: true
        },
        {
            name: "Link",
            selector: (row) => {
                return (
                    <a className="DocLink" href={`http://${row.documentLink}`} rel=" noreferrer" target={'_blank'}>Document</a>
                )
            },
            center: true,
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.status,
            center: true,
            sortable: true
        },
        {
            name: "Date",
            center: true,
            selector: row => moment(row.createdAt).format('MMMM, D, YYYY')
        },
    ]
    useEffect(() => {
        axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/requirements/getUserDocument`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${cookies.jwtToken}`
            },
            data: {
                employee_id: userInfo._id
            }
        })
            .then((response) => {
                console.log(response.data)
                setReqList(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [EMPRequirements, newReq]);
    const errStyle = {
        borderColor: "red",
    }
    function handleChange(e) {
        setFilterString(e.target.value)
        setFilterList(filterByValue(reqList, e.target.value))
    }
    function onSubmit(data) {
        axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/request/addRequest`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${cookies.jwtToken}`
            },
            data: {
                'employee_id': userInfo._id,
                'requestMessage': data.reqContent,
                'requestType': data.requestType,
                'numberOfDays': data.numberOfDays
            }
        })
            .then((response) => {
                swal("Request Succesfully Submitted")
                reset({
                    requestType: "",
                    numberOfDays: "",
                    reqContent: ""
                })
                setNewReq(!newReq)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function onSelect({ selectedRows }) {
        console.log(selectedRows)
    }
    return (
        <div className='EMPRequirement'>
            <div className='requestForm'>
                <h1>Requirement Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="inputGrp">
                        <label>Requirement Type*</label>
                        <select style={errors.requestType && errStyle}
                            {...register
                                ("requirementType", {
                                    required: "Type of Requirement Type is required"
                                })}>
                            <option disable hidden value="">Type of Request*</option>
                            <option value="SSS">SSS</option>
                            <option value="PSA">PSA</option>
                            <option value="Certificates">Certificates</option>
                            <option value="Diploma">Diploma</option>
                            <option value="NBIClearance">NBI Clearance</option>
                            <option value="TIN ID">TIN ID</option>
                            <option value="UMID">UMID </option>
                            <option value="DriversLicense">Driver’s License</option>
                            <option value="PRCLicense">PRC License </option>
                            <option value="Passport">Passport </option>
                        </select>
                        <p className='err'>{errors.requestType && errors.requestType.message}</p>
                    </div>
                    <div className="inputGrp">
                        <label>Attach Document*</label>
                        <input style={errors.numberOfDays && errStyle}
                            {...register('requirementFile',
                                {
                                    required: "File is Required",
                                })}
                            placeholder='Number of Days*'
                            type="file"
                        />
                        <p className='err'>{errors.numberOfDays && errors.numberOfDays.message}</p>
                    </div>
                    <input className='submit_btn' type="submit" value="Submit Requirement" />
                </form>
            </div>
            <div className='requestTable'>
                <div className="table_contaner">
                    <div className="title_bar">
                        <h1>Requests List</h1>
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
                            data={filterList ? filterList : reqList}
                            fixedHeaderScrollHeight="100%"
                            fixedHeader='true'
                            onSelectedRowsChange={onSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EMPRequirements