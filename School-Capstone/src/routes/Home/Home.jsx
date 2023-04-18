import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from "axios"
import { useCookies } from 'react-cookie';
import swal from "sweetalert"


export const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['jwtToken'])
    const [documentsPassedmap, setDocumentsPassedmap] = useState()
    const [announcementListmap, setAnnouncementListmap] = useState()
    const [eventsMap, setEventsMap] = useState()
    const [announcementBtnHanlder, setAnnouncementBtnHanlder] = useState(true)
    const [announcementVal, setAnnouncementVal] = useState()
    const events = [
        {
            name: "Sikhayan",
            date: "3-3-2023"
        },
        {
            name: "Holy Week",
            date: "3-3-2023"
        },
        {
            name: "Foundation Day",
            date: "3-3-2023"
        },
        {
            name: "Foundation Day",
            date: "3-3-2023"
        },

    ]
    useEffect(() => {
        axios.request({
            method: 'get',
            url: `http://localhost:5000/api/announcement/getAllAnnouncemnt`,
            headers: {
                'Authorization': `Bearer ${cookies.jwtToken}`
            }
        }).then((response) => {
            setAnnouncementListmap(
                response.data.map((announcemnt, index) => {
                    return (
                        <li key={index}><strong key={index}>{moment(announcemnt.createdAt).format("MMMM D YYYY")}</strong> - {announcemnt.content}</li>
                    )
                })
            )
        }).catch((error) => {
            console.error(error);
        });
    }, [Home, announcementListmap]);
    useEffect(() => {
        axios.request({
            method: 'get',
            url: `http://localhost:5000/api/requirements/getLimitDocument`,
            headers: {
                'Authorization': `Bearer ${cookies.jwtToken}`
            }
        }).then((response) => {
            setDocumentsPassedmap(
                response.data.map((docu, index) => {
                    return (
                        <tr key={index}>
                            <td>{`${docu.employee_id.firstName} ${docu.employee_id.lastName} `}</td>
                            <td>{docu.documentType}</td>
                            <td>{moment(docu.createdAt).format("MMMM D YYYY")}</td>
                        </tr>
                    )
                })
            )
        }).catch((error) => {
            console.error(error);
        });
    }, [Home, documentsPassedmap]);
    const mappedEvents = events.map((event,index) => {
        return (
            <li key={index}><strong>{event.date}</strong> - {event.name}</li>
        )
    })
    function postAnnouncement() {
        axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/announcement/postAnnouncement',
            headers: {
                'Authorization': `Bearer ${cookies.jwtToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: { content: announcementVal }
        }).then(() => {
            setAnnouncementBtnHanlder(!announcementBtnHanlder)
            swal({
                icon: 'success',
                title: 'Announcement',
                text: 'Succesfully Posted!',
            })
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className="home">
            <div className='welcome_banner'>
                <h3>Welcome to</h3>
                <h1>ASIATECH COLLEGE HRMS</h1>
            </div>
            <div className='second_section'>
                <div className='requirement_list'>
                    <h3>Recently Passed Requirements</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Document Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documentsPassedmap}
                        </tbody>
                    </table>
                    <Link to="/hr/requirements"><button>View More</button></Link>
                </div>
                <div className='announcement_list'>
                    <h3>
                        {announcementBtnHanlder ? "Recent Announcement" : "Announce"}
                    </h3>
                    {announcementBtnHanlder ?
                        <ul>{announcementListmap && announcementListmap}</ul>
                        :
                        <textarea
                            value={announcementVal}
                            onChange={(e) => { setAnnouncementVal(e.target.value) }}
                        >
                        </textarea>}
                    <div className='buttons'>
                        <button
                            onClick={() => { setAnnouncementBtnHanlder(!announcementBtnHanlder) }}>
                            {announcementBtnHanlder ?
                                "Announcement"
                                :
                                "Go Back To Announcement Board"}
                        </button>
                        {!announcementBtnHanlder &&
                            <button
                                onClick={postAnnouncement}>
                                Post Announcement
                            </button>}
                    </div>

                </div>
            </div>
            <div className='last_section'>
                <h3>Upcoming Events</h3>
                <ul>
                    {mappedEvents}
                </ul>
            </div>
        </div>
    )
}
