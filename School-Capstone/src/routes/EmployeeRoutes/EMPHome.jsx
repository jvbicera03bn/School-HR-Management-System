import {useState} from 'react'
import moment from 'moment'

const EMPHome = () => {
    const dateNow = new Date()
    return (
        <div className='home'>
            <div className='welcome_banner'>
                <h3>Welcome to</h3>
                <h1>ASIATECH COLLEGE HRMS</h1>
            </div>
            <div className='announcementBoard'>
                <h3>Announcement</h3>
                <p>{moment(dateNow).format('MMMM, D, YYYY')}</p>
            </div>
        </div>
    )
}

export default EMPHome