import { useContext, useState } from "react"
import { AuthContext } from '../../context/AuthContext'
import moment from "moment"


const EMPAccount = () => {
    const { userInfo } = useContext(AuthContext)
    const [isInfoEdit, setIsInfoEdit] = useState(true);
    function onSave() {
        setIsInfoEdit(!isInfoEdit)
    }
    function onEditInfo() {
        setIsInfoEdit(!isInfoEdit)
    }
    return (
        <div className='EMPAccount'>
            <h1 className="myAccountH">MY ACCOUNT</h1>
            <div className='section1'>
                <div className='accountInfo'>
                    <div className='header'>
                        <h1>{`${userInfo.lastName}, ${userInfo.firstName} ${userInfo.middleName}.`}</h1>
                        <span>EMP-{userInfo.IDNumber}</span>
                    </div>
                    <div className='allInfo'>
                        <div className="category">
                            <h2>E-mail Address:</h2>
                            <h2>Contact Number:</h2>
                            <h2>Address:</h2>
                            <h2>Marital Status:</h2>
                            <h2>Gender:</h2>
                            <h2>Birthdate:</h2>
                        </div>
                        {isInfoEdit ?
                            <div className="infos">
                                <p>{userInfo.email}</p>
                                <p>Not Applicable</p>
                                <p>{userInfo.email}</p>
                                <p>{userInfo.civilStatus}</p>
                                <p>{userInfo.sex}</p>
                                <p>{moment(userInfo.birthDate).format('MMMM, D, YYYY')}</p>
                            </div>
                            :
                            <div className="infos">
                                <input value={userInfo.email} type="text" />
                                <input value={"None"} type="text" />
                                <input value={userInfo.email} type="text" />
                                <input value={userInfo.civilStatus} type="text" />
                                <input value={userInfo.sex} type="text" />
                                <input value={moment(userInfo.birthDate).format('MMMM, D, YYYY')} type="date" />
                            </div>}
                    </div>
                    {isInfoEdit ?
                        <button onClick={onEditInfo} className="editButton">Edit</button>
                        :
                        <button onClick={onSave} className="editButton">Save</button>
                    }
                </div>
                <div className='scheduleInfo'>
                    <h1>WORKING HOURS</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="day">Monday</td>
                                <td>7:00 AM- 3:30 PM</td>
                            </tr>
                            <tr>
                                <td className="day">Tuesday</td>
                                <td>9:30 AM - 5:00 PM</td>
                            </tr>
                            <tr>
                                <td className="day">Wednesday</td>
                                <td>6:30 AM - 3:30 PM</td>
                            </tr>
                            <tr>
                                <td className="day">Thursday</td>
                                <td>NO Schedule</td>
                            </tr>
                            <tr>
                                <td className="day">Friday</td>
                                <td>NO Schedule</td>
                            </tr>
                            <tr>
                                <td className="day">Saturday</td>
                                <td>7:00 AM - 5:00 PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EMPAccount