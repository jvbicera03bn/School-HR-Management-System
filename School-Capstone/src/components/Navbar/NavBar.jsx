import { useState } from 'react'
import { Link } from "react-router-dom"
import React from 'react'

export const NavBar = () => {
    const [empDropDownStatus, setDropDownStatus] = useState(false)
    return (
        <div className='nav_bar'>
            <ul className='first_layer'>
                <li><Link to="/">
                    <span className="nav_icon material-symbols-outlined">home</span>
                    Home</Link></li>
                <li
                    onClick={() => { setDropDownStatus(!empDropDownStatus) }}
                >
                    <span className="nav_icon material-symbols-outlined">person</span>
                    Employee
                    <span className="drop_down nav_icon material-symbols-outlined">expand_more</span>
                </li>
                <li className={empDropDownStatus ? "drop_down_show" : "drop_down_hide"}>
                    <ul className='second_layer'>
                        <li>
                            <Link to="/employee/addEmployee">
                                <span className="nav_icon material-symbols-outlined">person_add</span>
                                Add Employee
                            </Link>
                        </li>
                        <li>
                            <Link to="/employee/listofemployee">
                                <span className="nav_icon material-symbols-outlined">group</span>
                                Employee List
                            </Link>
                        </li>
                        <li>
                            <Link to="/employee/setattendance">
                                <span className="nav_icon material-symbols-outlined">emoji_people</span>
                                Set Attendance
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/requirements">
                        <span className="nav_icon material-symbols-outlined">description</span>
                        Requirements
                    </Link>
                </li>
                <li>
                    <Link to="/payroll">
                        <span className="nav_icon material-symbols-outlined">account_balance</span>
                        Payroll
                    </Link>
                </li>
                <li>
                    <Link to="/request">
                        <span className="nav_icon material-symbols-outlined">inventory</span>
                        Request
                    </Link>
                </li>
                <li>
                    <Link>
                        <span className="nav_icon material-symbols-outlined">logout</span>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    )
}
