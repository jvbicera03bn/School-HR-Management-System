import { useState } from 'react'
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

const EMPHomeAnnouncementCard = (props) => {
    const dateNow = new Date()
    const { date } = props
    return (
        <div className='AnnouncementCard'>
            <h5>{moment(dateNow).format('MMMM, D, YYYY')}</h5>
            <p></p>
        </div>
    )
}
export default EMPHome