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
                response.data.map((announcemnt) => {
                    return (
                        <li><strong>{moment(announcemnt.createdAt).format("MMMM D YYYY")}</strong> - {announcemnt.content}</li>
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
                response.data.map((docu) => {
                    return (
                        <tr>
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
    /*  useEffect(() => {
 
     }, [input]); */
    /*     const mappedDocumentsPassed = documentsPassed.map((document) => {
            return (
                <tr>
                    <td>{document.name}</td>
                    <td>{document.docType}</td>
                    <td>{document.date}</td>
                </tr>
            )
        }) */
      const mappedEvents = events.map((event) => {
          return (
              <li><strong>{event.date}</strong> - {event.name}</li>
          )
      })
    const [announcementBtnHanlder, setAnnouncementBtnHanlder] = useState(true)
    const [announcementVal, setAnnouncementVal] = useState()
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
            swal("Annnouncement Posted")
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
                        <tr>
                            <th>Name</th>
                            <th>Document Type</th>
                            <th>Date</th>
                        </tr>
                        {documentsPassedmap}
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
