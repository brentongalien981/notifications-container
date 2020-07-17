import React from 'react';
import './NotificationActionsModal.css';

function NotificationActionsModal(props) {
    return (
        <div className="NotificationActionsModal">
            <div id="closeBtnHolder">
                <button className="btn btn-outline-light">X</button>
            </div>

            <div className="NotificationActionsHolder">
                <button className="btn btn-primary">delete</button>
                <button className="btn btn-primary">mark as read</button>
                <button className="btn btn-primary">mark as unread</button>
            </div>
        </div>
    );
}



export default NotificationActionsModal;