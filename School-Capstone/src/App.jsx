import './App.css'
import { Route, Routes } from "react-router-dom"
import { AddEmployee } from './routes/Employee/routes/AddEmployee/AddEmployee'
import { ListOfEmployee } from './routes/Employee/routes/ListOfEmployee/ListOfEmployee'
import { SetAttendance } from './routes/Employee/routes/SetAttendance/SetAttendance'
import { Requirements } from './routes/Requirements/Requirements'
import { Request } from './routes/Request/Request'
import { Payroll } from './routes/Payroll/Payroll'
import { Home } from './routes/Home/Home'
import { NavBar } from './components/Navbar/NavBar'


const App = () => {
    return (
        <div className='MainAPP'>
            {/* Log-In Register System Here */}
            <div className="App">
                <div className='side_bar'>
                    <div className='profile_info'>
                        <img className='profile_picture' src="./img/profile-placeholder.jpeg" alt="profile" />
                        <h3>Juan Dela Cruz</h3>
                        <p>Human Resource</p>
                    </div>
                    <div className='school_name'>
                        <h2>ASIATECH</h2>
                        <p>Human Resource Management System</p>
                    </div>
                    <NavBar />
                </div>
                <div className='content_window'>
                    <div className='banner'>
                        <img src="./img/school-logo.webp" alt="school_logo" />
                        <h2>ASIA TECHNOLOGICAL SCHOOL OF SCIENCE AND ARTS</h2>
                    </div>
                    <div className='main_content'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/employee/addemployee' element={<AddEmployee />} />
                            <Route path='/employee/listofemployee' element={<ListOfEmployee />} />
                            <Route path='/employee/setattendance' element={<SetAttendance />} />
                            <Route path='/requirements' element={<Requirements />} />
                            <Route path='/payroll' element={<Payroll />} />
                            <Route path='/request' element={<Request />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
