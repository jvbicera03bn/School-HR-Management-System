import React from 'react'
import { useForm } from "react-hook-form";

export const AddEmployee = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    function onSubmit(data) {
        console.log(data)
    }
    /* console.log(errors.lastName) */

    return (
        <div className='add_employee'>
            <h1>Add New Employee</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input_group'>
                    <div >
                        <input
                            {...register('lastName',
                                {
                                    required: "Last Name is Required",
                                    pattern: /^[a-zA-Z]+$/g
                                })}
                            placeholder='Last Name'
                        />
                        <p className='err'>{errors.lastName && errors.lastName.message}</p>
                    </div>
                    <div>
                        <input
                            {...register('firstName',
                                {
                                    required: "FirstName is Required",
                                    pattern: {
                                        value: /^[a-zA-Z]+$/g,
                                        message: "Only letters are allowed"
                                    }
                                })}
                            placeholder='FirstName'
                        />
                        <p className='err'>{errors.firstName && errors.firstName.message}</p>
                    </div>
                    <div>
                        <input
                            {...register('middleName',
                                {
                                    required: "Last Name is Required",
                                    pattern: {
                                        value: /^[a-zA-Z]+$/g,
                                        message: "Only letters are allowed"
                                    }
                                })}
                            placeholder='Middle Name'
                        />
                        <p className='err'>{errors.middleName && errors.middleName.message}</p>
                    </div>
                </div>
                <div className='input_group'>
                    <div>
                        <input
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
                        <input
                            {...register('email',
                                { required: "Email is Required" })}
                            placeholder='Email'
                            type="email"
                        />
                        <p className='err'>{errors.email && errors.email.message}</p>
                    </div>
                </div>
                <div className='input_group'>
                    <div>
                        <input
                            {...register('address',
                                { required: "Address is Required" })}
                            placeholder='Address'

                        />
                        <p className='err'>{errors.address && errors.address.message}</p>
                    </div>
                    <div>
                        <input
                            {...register('contactNumber',
                                { required: "Contact Number is Required" })}
                            placeholder='Contact Number'
                        />
                        <p className='err'>{errors.contactNumber && errors.contactNumber.message}</p>
                    </div>
                    <div>
                        <select {...register("sex", { required: "Sex is required" })}>
                            <option disable hidden value="">Sex</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                        <p className='err'>{errors.sex && errors.sex.message}</p>
                    </div>
                </div>
                <div className="third_form_group input_group">
                    <div>
                        <select {...register("civilStatus", { required: "Civil Status is required" })}>
                            <option disable hidden value="">Civil Status</option>
                            <option value="married">Married</option>
                            <option value="divorce">Divorce</option>
                            <option value="seperated">Seperated</option>
                            <option value="widowed">Widowed</option>
                        </select>
                        <p className='err'>{errors.civilStatus && errors.civilStatus.message}</p>
                    </div>
                    <div>
                        <select {...register("department", { required: "Department is required" })}>
                            <option disable hidden value="">Department</option>
                            <option value="basicEducation">Basic Education</option>
                            <option value="seniorHighSchool">Senior High</option>
                            <option value="college">College</option>
                        </select>
                        <p className='err'>{errors.department && errors.department.message}</p>
                    </div>
                    <div>
                        <select {...register("employeeStatus", { required: "Employee Status is required" })}>
                            <option disable hidden value="">Employee Status</option>
                            <option value="regular">Regular</option>
                            <option value="partTime">Part-Time</option>
                        </select>
                        <p className='err'>{errors.employeeStatus && errors.employeeStatus.message}</p>
                    </div>
                    <div>
                        <input
                            {...register('idNumber',
                                { required: "ID Number is Required" })}
                            placeholder='ID Number'
                        />
                        <p className='err'>{errors.idNumber && errors.idNumber.message}</p>
                    </div>
                </div>
                <div className='submit_button'>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}
