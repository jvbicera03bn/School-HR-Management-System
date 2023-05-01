import { useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../context/AuthContext'
import axios from "axios"
import swal from "sweetalert"

const errStyle = {
    borderColor: "red",
}

export const AddEmployee = () => {
    /* Form Functions */
    const { baseUrl, cookies, userInfo } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()

    function onSubmit(data) {
        axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/user/getNumUser`,
            headers: {
                'Authorization': `Bearer ${cookies.jwtToken}`
            }
        }).then((response1) => {
            const IDNumber = `${data.department.slice(0, 3).toUpperCase()}-${data.dateHired.slice(0, 4)}${/* Month */data.dateHired.slice(5, 7)}${/* Day */data.dateHired.slice(8, 10)}${response1.data}`
            axios.request(
                {
                    method: 'post',
                    url: `${baseUrl}/user/register`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "Authorization": `Bearer ${cookies.jwtToken}`
                    },
                    data: {
                        firstName: data.firstName,
                        middleName: data.middleName,
                        lastName: data.lastName,
                        userType: data.userType,
                        department: data.department,
                        email: data.email,
                        birthDate: data.birthDate,
                        IDNumber: IDNumber,
                        employeeStatus: data.employeeStatus,
                        civilStatus: data.civilStatus,
                        sex: data.sex,
                        dateHired: data.dateHired,
                        address: data.address,
                        contactNumber: data.contactNumber,
                        createdBy: req.body.createdBy,
                        password: `${data.firstName}${data.middleName}${data.lastName}`,
                    }
                }).then((response) => {
                    swal({
                        icon: 'success',
                        title: 'Employee',
                        text: 'Succesfully Registered!',
                    })
                }).catch((err) => {
                    console.error(err)
                    swal({
                        icon: 'error',
                        title: 'Employee',
                        text: `${err.response.data.emailExist}`,
                    })
                })
        })
            .catch((error) => {
                console.log(error)
                swal({
                    icon: 'error',
                    title: 'Register Failed!',
                    text: 'Please Try Again Later',
                })
            });

    }

    return (
        <div className='add_employee'>
            <h1>Add New Employee</h1>
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
                    {/* <div>
                        <span className='titleInput'>ID Number</span>
                        <input style={errors.IDNumber && errStyle}
                            {...register('IDNumber',
                                {
                                    required: "ID Number is Required",
                                    pattern: {
                                        value: /^[0-9]+$/g,
                                        message: "Only letters are allowed"
                                    }
                                })}
                            placeholder='ID Number*'
                        />
                        <p className='err'>{errors.IDNumber && errors.IDNumber.message}</p>
                    </div> */}
                </div>
                <div className='submit_button'>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}
