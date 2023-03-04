import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const Login = () => {
    const { isLoggedIn, userType } = useContext(AuthContext)
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        isLoggedIn
            ? <Navigate to={userType == "EMP" ? "/employee/home" : "/hr/home"} />
            : < div className='login' >
                <div className='form_container'>
                    <div className='title'>
                        <img src="./img/school-logo.webp" alt="school_logo" />
                        <h3>ASIATECH HR MANAGEMENT SYSTEM</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <input type='text' placeholder='Email/Username' />
                        <input type='password' placeholder='Password' />
                        <input type='submit' />
                    </form>
                </div>
            </div >
    )
}
