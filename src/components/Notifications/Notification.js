import React from 'react';
import './Notification.css';

function Notification(props) {
    return (
        <div className="notification">
            <div className="d-flex justify-content-between">
                <h5 className="notificationType">{props.notification.type}</h5>
                <h6 className="notificationDate">5 days ago&nbsp;
                <span className="dismissBtn badge badge-warning"
                        onClick={(e) => { alert("TODO") }}>x</span>
                </h6>
            </div>

            <div>
                <p className="notificationMessage">{props.notification.message}</p>
            </div>
        </div>
    );
}

export default Notification;