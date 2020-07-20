import React from 'react';
import './NotificationActionsModal.css';

function NotificationActionsModal(props) {
    return (
        <div className="NotificationActionsModal" onClick={props.onModalClose}>
            <div id="closeBtnHolder">
                <button className="btn btn-outline-light" onClick={props.onModalClose}>X</button>
            </div>

            <div className="NotificationActionsHolder" onClick={ (e) => { e.stopPropagation() } }>
                <button className="btn btn-primary" onClick={props.onDeleteNotification}>delete</button>
                <button className="btn btn-primary">mark as read</button>
                <button className="btn btn-primary">mark as unread</button>
            </div>
        </div>
    );
}



export default NotificationActionsModal;