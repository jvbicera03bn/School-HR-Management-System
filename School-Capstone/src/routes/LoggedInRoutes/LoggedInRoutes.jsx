import { Navigate, Outlet } from "react-router-dom"
import { HRNavBar } from '../../components/HRNavBar'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"


export const LoggedInRoutes = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

    function LogOutHandler() {
        setIsLoggedIn(false)
    }
    return (
        <>
            <div className='side_bar'>
                <div className='profile_info'>
                    <img className='profile_picture' src="/img/profile-placeholder.jpeg" alt="profile" />
                    <h3>Juan Dela Cruz</h3>
                    <p>Human Resource</p>
                </div>
                <div className='school_name'>
                    <h2>ASIATECH</h2>
                    <p>Human Resource Management System</p>
                </div>
                <HRNavBar LogOutHandler={LogOutHandler} />
            </div>
            <div className='content_window'>
                <div className='banner'>
                    <img src="/img/school-logo.webp" alt="school_logo" />
                    <h2>ASIA TECHNOLOGICAL SCHOOL OF SCIENCE AND ARTS</h2>
                </div>
                <div className='main_content'>
                    {isLoggedIn
                        ? <Outlet />
                        : <Navigate to="/login" />
                    }
                </div>
            </div>
        </>
    )
}
