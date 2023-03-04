import { useState } from 'react'
import { NavLink } from "react-router-dom"
import React from 'react'

export const NavBar = (props) => {
    console.log(props)
    const [empDropDownStatus, setDropDownStatus] = useState(false)
    return (
        <div className='nav_bar'>
            <ul className='first_layer'>
                <li>
                    <NavLink to="/">
                        <span className="nav_icon material-symbols-outlined">home</span>
                        Home
                    </NavLink>
                </li>
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
                            <NavLink to="/employee/addEmployee">
                                <span className="nav_icon material-symbols-outlined">person_add</span>
                                Add Employee
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/employee/listofemployee">
                                <span className="nav_icon material-symbols-outlined">group</span>
                                Employee List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/employee/setattendance">
                                <span className="nav_icon material-symbols-outlined">emoji_people</span>
                                Set Attendance
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/requirements">
                        <span className="nav_icon material-symbols-outlined">description</span>
                        Requirements
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/payroll">
                        <span className="nav_icon material-symbols-outlined">account_balance</span>
                        Payroll
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/request">
                        <span className="nav_icon material-symbols-outlined">inventory</span>
                        Request
                    </NavLink>
                </li>
                <li
                    onClick={props.LogOutHandler}
                >
                    <span className="nav_icon material-symbols-outlined">logout</span>
                    Logout
                </li>
            </ul>
        </div>
    )
}
