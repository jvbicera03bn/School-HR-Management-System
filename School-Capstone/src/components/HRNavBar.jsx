import { NavLink } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"

export const HRNavBar = () => {
    const { logOut, userInfo } = useContext(AuthContext)
    const [empDropDownStatus, setDropDownStatus] = useState(false)
    const [hrRole, setHrRole] = useState()
    useEffect(() => {
        setHrRole(userInfo.isMainHR)
    }, [userInfo]);
    return (
        <div className='nav_bar'>
            <ul className='first_layer'>
                <li>
                    <NavLink to="/hr/home">
                        <span className="nav_icon material-symbols-outlined">home</span>
                        Home
                    </NavLink>
                </li>
                <li onClick={() => { setDropDownStatus(!empDropDownStatus) }}>
                    <span className="nav_icon material-symbols-outlined">person</span>
                    Employee
                    <span className="drop_down nav_icon material-symbols-outlined">expand_more</span>
                </li>
                <li className={empDropDownStatus ? "drop_down_show" : "drop_down_hide"}>
                    <ul className='second_layer'>
                        {hrRole &&
                            <li>
                                <NavLink to="/hr/employee/addEmployee">
                                    <span className="nav_icon material-symbols-outlined">person_add</span>
                                    Add Employee
                                </NavLink>
                            </li>
                        }
                        <li>
                            <NavLink to="/hr/employee/listofemployee">
                                <span className="nav_icon material-symbols-outlined">group</span>
                                Employee List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/hr/employee/setattendance">
                                <span className="nav_icon material-symbols-outlined">emoji_people</span>
                                Set Attendance
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/hr/requirements">
                        <span className="nav_icon material-symbols-outlined">description</span>
                        Requirements
                    </NavLink>
                </li>
                {hrRole &&
                    <li>
                        <NavLink to="/hr/payroll">
                            <span className="nav_icon material-symbols-outlined">account_balance</span>
                            Payroll
                        </NavLink>
                    </li>
                }
                <li>
                    <NavLink to="/hr/request">
                        <span className="nav_icon material-symbols-outlined">inventory</span>
                        Request
                    </NavLink>
                </li>
                <li
                    onClick={logOut}
                >
                    <span className="nav_icon material-symbols-outlined">logout</span>
                    Logout
                </li>
            </ul>
        </div>
    )
}
