import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import moment from 'moment'

const EMPHome = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['jwtToken'])
    const [mappedAnnouncement, setMappedAnnouncement] = useState()
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/announcement/getAnnouncement',
            headers: {
                'Authorization': `Bearer ${cookies.jwtToken}`
            }
        };

        axios.request(config)
            .then((response) => {
                setMappedAnnouncement(
                    response.data.map((announcement) => {
                        return (
                            <EMPHomeAnnouncementCard date={announcement.createdAt} content={announcement.content} />
                        )
                    })
                )
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [EMPHome, mappedAnnouncement]);
    const dateNow = new Date()
    return (
        <div className='home'>
            <div className='welcome_banner'>
                <h3>Welcome to</h3>
                <h1>ASIATECH COLLEGE HRMS</h1>
            </div>
            <div className='announcementBoard'>
                <h3>Announcement</h3>
                <div className='announcementCards'>
                    {mappedAnnouncement}
                </div>
            </div>
        </div>
    )
}

const EMPHomeAnnouncementCard = (props) => {
    const { date, content } = props
    const dateNow = moment(date).format('MMMM, D, YYYY')
    return (
        <div className='AnnouncementCard'>
            <h3>{dateNow}</h3>
            <p>{content}</p>
        </div>
    )
}
export default EMPHome