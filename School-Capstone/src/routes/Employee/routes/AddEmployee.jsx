import { useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../context/AuthContext'
import axios from "axios"

const errStyle = {
    borderColor: "red",
}

export const AddEmployee = () => {
    /* Form Functions */
    const { baseUrl } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    /* Submiit Request not working must fix tomo */
  
    function onSubmit(data) {
        axios.post(`${baseUrl}/user/register`,{
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            userType: data.userType,
            department: data.department,
            email: data.email,
            birthDate: data.birthDate,
            IDNumber: data.IDNumber,
            employeeStatus: data.employeeStatus,
            civilStatus: data.civilStatus,
            sex: data.sex,
            password: `${data.firstName}${data.middleName}${data.lastName}`,
        } 
        ).then((response) => {
            console.log(response)
            setModal(true)
        }).catch((err)=>{
            console.log(err)
        })
    }
    /* console.log(errors.lastName) */
    /* Modal Functions */
    const [modal, setModal] = useState(false);

    const modalStyle = {
        "width": "100vw",
        "height": "100vh",
        'backgroundColor': "rgba(0, 0, 0, 0.413)",
        'position': "absolute",
        "top": "0px",
        "left": "0px",
        'display': modal ? "block" : "none",
    }
    const modalContentStyle = {
        'backgroundColor': "rgb(51, 153, 102)",
        'color': 'white',
        "width": '40%',
        "borderRadius": "10px",
        "padding": '5%',
        "textAlign": "center",
        "margin": "15% auto"
    }
    return (
        <div className='add_employee'>
            <div style={modalStyle} className='modal' onClick={() => { setModal(false) }}>
                <div style={modalContentStyle} className='modal_content'>
                    <h1>Succesfully Added an Employee</h1>
                    <button>Close</button>
                </div>
            </div>
            <h1>Add New Employee</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input_group'>
                    <div >
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
                        <input style={errors.firstName && errStyle}
                            {...register('firstName',
                                {
                                    required: "FirstName is Required",
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
                </div>
                <div className='input_group'>
                    <div>
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
                        <select style={errors.department && errStyle} {...register("department", { required: "Department is required" })}>
                            <option disable hidden value="">Department*</option>
                            <option value="basicEducation">Basic Education</option>
                            <option value="seniorHigh">Senior High</option>
                            <option value="college">College</option>
                        </select>
                        <p className='err'>{errors.department && errors.department.message}</p>
                    </div>
                    <div>
                        <select style={errors.employeeStatus && errStyle} {...register("employeeStatus", { required: "Employee Status is required" })}>
                            <option disable hidden value="">Employee Status*</option>
                            <option value="regular">Regular</option>
                            <option value="partTime">Part-Time</option>
                        </select>
                        <p className='err'>{errors.employeeStatus && errors.employeeStatus.message}</p>
                    </div>
                    <div>
                        <input style={errors.idNumber && errStyle}
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
                        <p className='err'>{errors.idNumber && errors.idNumber.message}</p>
                    </div>
                </div>
                <div className='submit_button'>
                    <input type="submit" />
                    {/* <button onClick={() => { setModal(true) }}>open Modal</button> */}
                </div>
            </form>
        </div>
    )
}
