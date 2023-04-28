import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

import DataTable from "react-data-table-component"
import moment from "moment"
import axios from "axios"
import swal from "sweetalert"

import { storage } from "../../firebase/firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

const EMPRequirements = () => {

    const { userInfo, baseUrl, cookies } = useContext(AuthContext)
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()
    const [reqList, setReqList] = useState()
    const [newReq, setNewReq] = useState(0)
    const [filterString, setFilterString] = useState()
    const [filterList, setFilterList] = useState()
    const [SSSnumber, setSSSnumberInp] = useState(false)
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
            name: "Document Type",
            selector: row => row.documentType,
            center: true,
            sortable: true
        },
        {
            name: "View Document",
            selector: (row) => {
                return (
                    <a className="DocLink" href={`${row.documentLink}`} rel=" noreferrer" target={'_blank'}>Document</a>
                )
            },
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
        const { requirementFile, requirementType } = data
        const fileRef = ref(storage, `requirements/${userInfo.firstName}${userInfo.lastName}${requirementType + v4()}`)
        uploadBytes(fileRef, requirementFile[0])
            .then((res) => {
                getDownloadURL(res.ref).then((url) => {
                    axios.request({
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: `${baseUrl}/requirements/uploadRequirement`,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${cookies.jwtToken}`
                        },
                        data: {
                            'employee_id': userInfo._id,
                            'documentLink': url,
                            'documentType': requirementType,
                        }
                    })
                        .then((response) => {
                            swal({
                                icon: 'success',
                                title: 'Requirement',
                                text: 'Requirement Succesfully Submitted!',
                            })
                            reset({
                                requirementType: "",
                                requirementFile: "",
                                SSSnumber: ""
                            })
                            setNewReq(!newReq)
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            })


    }
    console.log(SSSnumber)
    return (
        <div className='EMPRequirement'>
            <div className='requestForm'>
                <h1>Requirement Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="inputGrp">
                        <label>Requirement Type*</label>
                        <select
                            style={errors.requestType && errStyle}
                            {...register
                                ("requirementType", {
                                    onChange: (e) => { e.target.value == "SSS" ? setSSSnumberInp(true) : setSSSnumberInp(false) },
                                    required: "Type of Requirement is required"
                                })
                            }
                        >
                            <option disable hidden value="">Type of Requirement*</option>
                            <option value="SSS">SSS</option>
                            <option value="Resume">Resume</option>
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
                        <p className='err'>{errors.requirementType && errors.requirementType.message}</p>
                    </div>
                    {SSSnumber && <div className="inputGrp">
                        <label>SSS Number *</label>
                        <input style={errors.numberOfDays && errStyle}
                            {...register('SSSnumber',
                                {
                                    required: "SSS Number is Required",
                                })}
                            placeholder='Number of Days*'
                            type="text"
                        />
                        <p className='err'>{errors.SSSnumber && errors.SSSnumber.message}</p>
                    </div>}
                    <div className="inputGrp">
                        <label>Attach Document*</label>
                        <input style={errors.numberOfDays && errStyle}
                            {...register('requirementFile',
                                {
                                    onChange: (e) => { console.log(e.target.value) },
                                    required: "File is Required",
                                    validate: {
                                        lessThan10MB: (file) => file[0].size <= 320000 || "Max 30kb",
                                        acceptedFormats: (file) => ["image/jpeg", "image/png", "image/gif", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file[0].type) || "Only PNG, JPEG, Docx, PDF e GIF "
                                    }
                                })}
                            placeholder='Number of Days*'
                            type="file"
                        />
                        <p className='err'>{errors.requirementFile && errors.requirementFile.message}</p>
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
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EMPRequirements