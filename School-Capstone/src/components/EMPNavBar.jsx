import { useState, useContext } from 'react'
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const EMPNavBar = (props) => {
    const { logOut, useInfo } = useContext(AuthContext)

    const [empDropDownStatus, setDropDownStatus] = useState(false)

    return (
        <div className='nav_bar'>
            <ul className='first_layer'>
                <li>
                    <NavLink to="home">
                        <span className="nav_icon material-symbols-outlined">home</span>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="account">
                        <span className="nav_icon material-symbols-outlined">person</span>
                        Account
                    </NavLink>
                </li>
                <li>
                    <NavLink to="requirements">
                        <span className="nav_icon material-symbols-outlined">description</span>
                        Requirements
                    </NavLink>
                </li>
                <li>
                    <NavLink to="payslip">
                        <span className="nav_icon material-symbols-outlined">account_balance</span>
                        Payslip
                    </NavLink>
                </li>
                <li>
                    <NavLink to="request">
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
