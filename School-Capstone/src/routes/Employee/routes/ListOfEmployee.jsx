import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios"
import DataTable from 'react-data-table-component'
import { useForm } from "react-hook-form"
const errStyle = {
    borderColor: "red",
}
export const ListOfEmployee = () => {
    const { cookies, baseUrl } = useContext(AuthContext);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [editMode, setEditMode] = useState(false)
    const [editID, setEditId] = useState()
    const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
    const [employeeList, setEmployeeList] = useState()
    const columns = [
        {
            name: "ID Number",
            selector: row => row.idNumber,
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
            name: "Department",
            selector: row => uppercaseWords(row.schoolDepartment),
            center: true,
            sortable: true
        },
        {
            name: "Employee Status",
            selector: row => uppercaseWords(row.employeeStatus),
            center: true,
            sortable: true
        },
        {
            name: "Action",
            selector: row => <button className="editEmployee" onClick={() => { onEditModeHandler(row.User_ID) }}>Edit User</button>,
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
    }, [cookies, editMode]);
    function onEditModeHandler(userID) {
        setEditMode(true)
        setEditId(userID)
        setValue('name', 'value')
        setValue('name', 'value')
        console.log(userID)
        axios.request(
            {
                method: 'post',
                url: `${baseUrl}/user/userID`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": `Bearer ${cookies.jwtToken}`
                },
                data: {
                    id: userID,
                }
            }).then((response) => {
                console.log(response.data)
                setValue('lastName', response.data.lastName)
                setValue('firstName', response.data.firstName)
                setValue('middleName', response.data.middleName)
                setValue('sex', response.data.sex)
                setValue('employeeStatus', response.data.employeeStatus)
                setValue('email', response.data.email)
                setValue('department', response.data.department)
                setValue('dateHired', response.data.dateHired)
                setValue('contactNumber', response.data.contactNumber)
                setValue('civilStatus', response.data.civilStatus)
                setValue('birthDate', response.data.birthDate)
                setValue('address', response.data.address)
            }).catch((err) => {
                console.log(err)
            })
    }
    function employeeListMode() {
        setEditMode(false)
    }
    /* Edit Function */
    function onSubmit(data) {
        axios.request(
            {
                method: 'put',
                url: `${baseUrl}/user/update`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": `Bearer ${cookies.jwtToken}`
                },
                data: {
                    id: editID,
                    firstName: data.firstName,
                    middleName: data.middleName,
                    lastName: data.lastName,
                    userType: data.userType,
                    department: data.department,
                    email: data.email,
                    birthDate: data.birthDate,
                    employeeStatus: data.employeeStatus,
                    civilStatus: data.civilStatus,
                    sex: data.sex,
                    dateHired: data.dateHired,
                    address: data.address,
                    contactNumber: data.contactNumber,
                }
            }).then((response) => {
                console.log(response)
                swal({
                    icon: 'success',
                    title: 'Employee',
                    text: 'Succesfully Edited!',
                })
            }).catch((err) => {
                swal({
                    icon: 'error',
                    title: 'Employee',
                    text: `${err.response.data.emailExist}`,
                })
            })
    }
    return (
        <div className='listOfEmployee'>
            {!editMode ? <div className="table_contaner">
                <div className="title_bar">
                    <h1>Employee List</h1>
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
                :
                <div className="edit_employee">
                    <h1>Edit Employee</h1>
                    <button
                        className="goBackBtn"
                        onClick={employeeListMode}>
                        <span class="material-symbols-outlined">
                            arrow_back
                        </span>
                        {/* Go Back to Employee List */}</button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='input_group'>
                            <div >
                                <span className='titleInput'>Last Name</span>
                                <input style={errors.lastName && errStyle}
                                    {...register('lastName',
                                        {
                                            required: "Last Name is Required",
                                            pattern: {
                                                value: /^[a-zA-Z]+$/g,
                                                message: "Only letters are allowed"
                                            }
                                        })}
                                    placeholder='Last Name*'
                                />
                                <p className='err'>{errors.lastName && errors.lastName.message}</p>
                            </div>
                            <div>
                                <span className='titleInput'>First Name</span>
                                <input style={errors.firstName && errStyle}
                                    {...register('firstName',
                                        {
                                            required: "First Name is Required",
                                            pattern: {
                                                value: /^[a-zA-Z]+$/g,
                                                message: "Only letters are allowed"
                                            }
                                        })}
                                    placeholder='FirstName*'
                                />
                                <p className='err'>{errors.firstName && errors.firstName.message}</p>
                            </div>
                            <div>
                                <span className='titleInput'>Middle Name</span>
                                <input style={errors.middleName && errStyle}
                                    {...register('middleName',
                                        {
                                            required: "Last Name is Required",
                                            pattern: {
                                                value: /^[a-zA-Z]+$/g,
                                                message: "Only letters are allowed"
                                            }
                                        })}
                                    placeholder='Middle Name*'
                                />
                                <p className='err'>{errors.middleName && errors.middleName.message}</p>
                            </div>
                        </div>
                        <div className='input_group'>
                            <div>
                                <span className='titleInput'>Birthdate</span>
                                <input style={errors.birthDate && errStyle}
                                    {...register('birthDate',
                                        {
                                            required: "Birthdate is Required",
                                        })}
                                    placeholder='Middle Name'
                                    type="date"
                                />
                                <p className='err'>{errors.birthDate && errors.birthDate.message}</p>
                            </div>
                            <div>
                                <span className='titleInput'>Email</span>
                                <input className='email_input' style={errors.email && errStyle}
                                    {...register('email',
                                        {
                                            required: "Email is Required",
                                            pattern: {
                                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                message: "This is not a valid Email"
                                            }
                                        })}
                                    placeholder='Email*'
                                />
                                <p className='err'>{errors.email && errors.email.message}</p>
                            </div>
                            <div>
                                <span className='titleInput'>Date Hired</span>
                                <input style={errors.dateHired && errStyle}
                                    {...register('dateHired',
                                        {
                                            required: "Date Hired is Required",

                                        })}
                                    placeholder='Email*'
                                    type="date"
                                />
                                <p className='err'>{errors.dateHired && errors.dateHired.message}</p>
                            </div>
                        </div>
                        <div className='input_group'>
                            <div>
                                <span className='titleInput'>Address</span>
                                <input style={errors.address && errStyle}
                                    {...register('address',
                                        {
                                            required: "Address is Required",
                                            pattern: {
                                                value: /^[a-zA-Z]+$/g,
                                                message: "Only letters are allowed"
                                            }
                                        })}
                                    placeholder='Address*'
                                />
                                <p className='err'>{errors.address && errors.address.message}</p>
                            </div>
                            <div>
                                <span className='titleInput'>Contact Number</span>
                                <input style={errors.contactNumber && errStyle}
                                    {...register('contactNumber',
                                        {
                                            required: "Contact Number is Required",
                                            pattern: {
                                                value: /^(09)[1-9](\d{2}){4}$/,
                                                message: "This is Not a Valid Cellphone Number"
                                            }
                                        })}
                                    placeholder='Contact Number*'
                                />
                                <p className='err'>{errors.contactNumber && errors.contactNumber.message}</p>
                            </div>
                            <div>
                                <span className='titleInput'>Sex</span>
                                <select style={errors.sex && errStyle} {...register("sex", { required: "Sex is required" })}>
                                    <option disable hidden value="">Sex*</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </select>
                                <p className='err'>{errors.sex && errors.sex.message}</p>
                            </div>
                        </div>
                        <div className="third_form_group input_group">
                            <div>
                                <span className='titleInput'>Civil Status</span>
                                <select style={errors.civilStatus && errStyle} {...register("civilStatus", { required: "Civil Status is required" })}>
                                    <option disable hidden value="">Civil Status*</option>
                                    <option value="married">Married</option>
                                    <option value="divorce">Divorce</option>
                                    <option value="seperated">Seperated</option>
                                    <option value="widowed">Widowed</option>
                                    <option value="single">Single</option>
                                </select>
                                <p className='err'>{errors.civilStatus && errors.civilStatus.message}</p>
                            </div>
                            <div>
                                <span className='titleInput'>Department</span>
                                <select style={errors.department && errStyle} {...register("department", { required: "Department is required" })}>
                                    <option disable hidden value="">Department*</option>
                                    <option value="basicEducation">Basic Education</option>
                                    <option value="seniorHigh">Senior High</option>
                                    <option value="college">College</option>
                                </select>
                                <p className='err'>{errors.department && errors.department.message}</p>
                            </div>
                            <div>
                                <span className='titleInput'>Employee Status</span>
                                <select style={errors.employeeStatus && errStyle} {...register("employeeStatus", { required: "Employee Status is required" })}>
                                    <option disable hidden value="">Employee Status*</option>
                                    <option value="regular">Regular</option>
                                    <option value="partTime">Part-Time</option>
                                </select>
                                <p className='err'>{errors.employeeStatus && errors.employeeStatus.message}</p>
                            </div>
                        </div>
                        <div className='submit_button'>
                            <input type="submit" />
                        </div>
                    </form>
                </div>}
        </div>
    )
}

