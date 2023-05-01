import './App.css'
import { Route, Routes } from "react-router-dom"
import { useState, useContext, useEffect } from 'react'
/* Route For HR */
import { AddEmployee } from './routes/Employee/routes/AddEmployee'
import { ListOfEmployee } from './routes/Employee/routes/ListOfEmployee'
import { SetAttendance } from './routes/Employee/routes/SetAttendance'
import { Requirements } from './routes/Requirements/Requirements'
import { Request } from './routes/Request/Request'
import { Payroll } from './routes/Payroll/Payroll'
import { Home } from './routes/Home/Home'
import { LoggedInRoutes } from "./routes/LoggedInRoutes/LoggedInRoutes"
import { Login } from "./routes/LoginRegistration/Login"
import { Register } from "./routes/LoginRegistration/Register"
import { AuthContext } from './context/AuthContext'
import EMPAccount from './routes/EmployeeRoutes/EMPAccount'
import EMPHome from './routes/EmployeeRoutes/EMPHome'
import EMPRequest from './routes/EmployeeRoutes/EMPRequest'
import EMPPayslip from './routes/EmployeeRoutes/EMPPayslip'
import EMPRequirements from './routes/EmployeeRoutes/EMPRequirements'
import { RequestDepHead } from './routes/EmployeeRoutes/EMPRequestDep'

const App = () => {
    const { userInfo } = useContext(AuthContext)
    const [userType, setUserInfo] = useState()
    useEffect(() => {
        if (userInfo) {
            setUserInfo(userInfo.userType)
        }
    }, [userInfo]);
    return (
        <div className="App" id="app">
            <Routes>
                {userInfo && userType == "EMP"
                    ? < Route path='/employee' element={<LoggedInRoutes />}>
                        <Route path='home' element={<EMPHome />} />
                        <Route path='account' element={<EMPAccount />} />
                        <Route path='requirements' element={<EMPRequirements />} />
                        <Route path='payslip' element={<EMPPayslip />} />
                        <Route path='request' element={<EMPRequest />} />
                        <Route path='requestDepHead' element={<RequestDepHead/>} />
                    </Route>
                    : < Route path='/hr' element={<LoggedInRoutes />}>
                        <Route path='home' element={<Home />} />
                        <Route path="employee">
                            <Route path='addemployee' element={<AddEmployee />} />
                            <Route path='listofemployee' element={<ListOfEmployee />} />
                            <Route path='setattendance' element={<SetAttendance />} />
                        </Route>
                        <Route path='requirements' element={<Requirements />} />
                        <Route path='payroll' element={<Payroll />} />
                        <Route path='request' element={<Request />} />
                    </Route>
                }
                <Route path="/*" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div >
    )
}
export default App
