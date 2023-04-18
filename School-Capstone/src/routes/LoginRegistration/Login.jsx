import { useContext, useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


export const Login = () => {
    const { isLoggedIn, logIn, userInfo } = useContext(AuthContext)
    const [newIsLoggedIn, setNewIsLoggedIn] = useState()
    const [userType, setuserType] = useState();
    const [credential, setCredential] = useState({
        email: "",
        password: "",
    })
    console.log(credential)
    function handleChange(e) {
        const { name, value } = e.target
        setCredential({
            ...credential,
            [name]: value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        logIn(credential.email, credential.password)
    }
    useEffect(() => {
        if (userInfo) {
            setuserType(userInfo.userType)
        } else {

        }
        false ? console.log("true") : console.log("false")
    }, [userInfo, isLoggedIn]);
    return (
        isLoggedIn
            ? <Navigate to={isLoggedIn && userType == "EMP" ? "/employee/home" : "/hr/home"} />
            : < div className='login' >
                <div className='form_container'>
                    <div className='title'>
                        <img src="https://ibb.co/2ZRWyd4" alt="school_logo" />
                        <h3>ASIATECH HR MANAGEMENT SYSTEM</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <input onChange={handleChange} required name="email" type='text' placeholder='Email/Username' />
                        <input onChange={handleChange} required name="password" type='password' placeholder='Password' />
                        <input type='submit' name="Log-In" />
                    </form>
                </div>
            </div >
    )
}
