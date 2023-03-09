import { useContext, useState, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { HRNavBar } from '../../components/HRNavBar'
import { EMPNavBar } from '../../components/EMPNavBar'
import { AuthContext } from "../../context/AuthContext"

export const LoggedInRoutes = () => {
    const { isLoggedIn, userInfo } = useContext(AuthContext)
    const [userProfileInfo, setUserProfileInfo] = useState()
    useEffect(() => {
        if (userInfo) {
            setUserProfileInfo({
                name: `${userInfo.firstName} ${userInfo.lastName}`,
                userType: userInfo.userType
            })
        }
    }, [userInfo]);
    return (
        <>
            <div className='side_bar'>
                <div className='profile_info'>
                    <img className='profile_picture' src="/img/profile-placeholder.jpeg" alt="profile" />
                    <h3>{userProfileInfo ? `${userProfileInfo.name}` : `Loading Profile`}</h3>
                    <p>{userProfileInfo && userProfileInfo.userType == "HR" ? 'Human Resource' : "Employee"}</p>
                </div>
                <div className='school_name'>
                    <h2>ASIATECH</h2>
                    <p>Human Resource Management System</p>
                </div>
                {userProfileInfo && userProfileInfo.userType == "HR" ? <HRNavBar /> : <EMPNavBar />}
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
