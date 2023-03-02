import './App.css'


const App = () => {
    return (
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
            </div>
            <div className='content_window'>
                <div className='main_content'>

                </div>
            </div>
        </div>
    )
}

export default App
