import './App.css'
import { Route, Routes } from "react-router-dom"
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


const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route element={<LoggedInRoutes />}>
                    <Route path='/' element={<Home />} />
                    <Route path="/employee">
                        <Route path='addemployee' element={<AddEmployee />} />
                        <Route path='listofemployee' element={<ListOfEmployee />} />
                        <Route path='setattendance' element={<SetAttendance />} />
                    </Route>
                    <Route path='/requirements' element={<Requirements />} />
                    <Route path='/payroll' element={<Payroll />} />
                    <Route path='/request' element={<Request />} />
                </Route>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}

export default App
