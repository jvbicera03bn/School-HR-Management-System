import { useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { AuthContext } from "../../context/AuthContext"
import moment from "moment"
import axios from "axios"
import swal from "sweetalert"

const EMPRequest = () => {
    const { userInfo, baseUrl, cookies } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [reqList, setReqList] = useState()
    const [newReq, setNewReq] = useState(0)
    const [filterString, setFilterString] = useState()
    const [filterList, setFilterList] = useState()
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
    const columns = [

        {
            name: "Request Type",
            selector: row => row.requestType,
            sortable: true,
            center: true
        },
        {
            name: "Number Of Days",
            selector: row => row.numberOfDays,
            center: true,
            sortable: true
        },
        {
            name: "Status",
            selector: row => <strong className={status(row.status)}>{uppercaseWords(row.status)}</strong>,
            center: true,
            sortable: true
        },
        {
            name: "Dep Head Status",
            selector: row => <strong className={status(row.depHeadApproval)}>{uppercaseWords(row.depHeadApproval)}</strong>,
            sortable: true,
            center: true,
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
            url: `${baseUrl}/request/getUserRequest`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${cookies.jwtToken}`
            },
            data: {
                employee_id: userInfo._id
            }
        })
            .then((response) => {
                console.log(response)
                setReqList(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [EMPRequest, newReq]);
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
                swal({
                    icon: 'success',
                    title: 'Request',
                    text: 'Request Succesfully Submitted!',
                })
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
        <div className='EMPRequest'>
            <div className='requestForm'>
                <h1>Requests Form</h1>
                <p className="leavesLeft">Leaves Left: {userInfo.leavesLeft}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="inputGrp">
                        <label>Request Type*</label>
                        <select style={errors.requestType && errStyle}
                            {...register
                                ("requestType", {
                                    required: "Type of Request is required"
                                })}>
                            <option disable hidden value="">Type of Request*</option>
                            <option value="Sick">Sick Leave</option>
                            <option value="Vacation">Vacation Leave</option>
                        </select>
                        <p className='err'>{errors.requestType && errors.requestType.message}</p>
                    </div>
                    <div className="inputGrp">
                        <label>Number of Days*</label>
                        <input style={errors.numberOfDays && errStyle}
                            {...register('numberOfDays',
                                {
                                    required: "Number of Days is Required",
                                    min: 1,
                                    max: 4,
                                    validate: {
                                        noOfDays: () => userInfo.leavesLeft >= 1 || 'You dont have any leaves left',
                                    },
                                })}
                            placeholder='Number of Days*'
                            type="number"
                        />
                        <p className='err'>{errors.numberOfDays && errors.numberOfDays.message}</p>
                    </div>
                    <div className="inputGrp">
                        <label>Request Letter*</label>
                        <textarea
                            className="textarea"
                            type="textarea"
                            style={errors.reqContent && errStyle}
                            {...register('reqContent',
                                {
                                    required: "Request Content Is Required",
                                })}
                            placeholder='Request Message*'
                        />
                        <p className='err'>{errors.reqContent && errors.reqContent.message}</p>
                    </div>
                    <input className='submit_btn' type="submit" value="Submit Leave" />
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


export default EMPRequest