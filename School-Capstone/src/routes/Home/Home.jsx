import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    const documentsPassed = [
        {
            name: "Jack Vincent Bicera",
            docType: "Form137",
            date: "3/3/2023"
        },
        {
            name: "Aia Galang",
            docType: "Diploma",
            date: "3/3/2023"
        },
        {
            name: "Shelley Mae Carreon",
            docType: "TOR",
            date: "3/3/2023"
        },
        {
            name: "Chesca Cutie",
            docType: "ID",
            date: "3/3/2023"
        },
    ]
    const announcementList = [
        {
            content: "This is an Announcement 1",
            date: "3-3-2023"
        },
        {
            content: "Walang Pasok",
            date: "3-3-2023"
        },
        {
            content: "Test long announcement lorem ipsum",
            date: "3-3-2023"
        },
        {
            content: "Test long announcement lorem ipsum",
            date: "3-3-2023"
        },
        {
            content: "Test long announcement lorem ipsum",
            date: "3-3-2023"
        },
        {
            content: "Test long announcement lorem ipsum",
            date: "3-3-2023"
        },
        
    ]
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
    const mappedAnnouncementList = announcementList.map((announcemnt) => {
        return (
            <li><strong>{announcemnt.date}</strong> - {announcemnt.content}</li>
        )
    })
    const mappedDocumentsPassed = documentsPassed.map((document) => {
        return (
            <tr>
                <td>{document.name}</td>
                <td>{document.docType}</td>
                <td>{document.date}</td>
            </tr>
        )
    })
    const mappedEvents = events.map((event)=>{
        return (
            <li><strong>{event.date}</strong> - {event.name}</li>
        )
    })
    const [announcementBtnHanlder, setAnnouncementBtnHanlder] = useState(true)
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
                        {mappedDocumentsPassed}
                    </table>
                    <Link to="requirements"><button>View More</button></Link>
                </div>
                <div className='announcement_list'>
                    <h3>
                        {announcementBtnHanlder ? "Recent Announcement" : "Announce"}
                    </h3>
                    {announcementBtnHanlder ?
                        <ul>{mappedAnnouncementList}</ul>
                        :
                        <textarea></textarea>}
                    <button
                        onClick={() => { setAnnouncementBtnHanlder(!announcementBtnHanlder) }}>
                        {announcementBtnHanlder ?
                            "Announcement"
                            :
                            "Go Back To Announcement Board"}
                    </button>
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
