import React from 'react';
import './NotificationActionsModal.css';
import { UNREAD, READ } from '../NotificationsFilters/NotificationsFilters';


function NotificationActionsModal(props) {

    //
    let markAsReadBtn = (<button className="btn btn-primary" onClick={props.onMarkNotificationAsRead}>mark as read</button>);
    let markAsUnreadBtn = (<button className="btn btn-primary" onClick={props.onMarkNotificationAsUnread}>mark as unread</button>);

    switch (props.filter) {
        case UNREAD:
            markAsUnreadBtn = null;
            break;
        case READ:
            markAsReadBtn = null;
            break;
    }


    //
    return (
        <div className="NotificationActionsModal" onClick={props.onModalClose}>
            <div id="closeBtnHolder">
                <button className="btn btn-outline-light" onClick={props.onModalClose}>X</button>
            </div>

            <div className="NotificationActionsHolder" onClick={ (e) => { e.stopPropagation() } }>
                <button className="btn btn-primary" onClick={props.onDeleteNotification}>delete</button>
                {markAsReadBtn}
                {markAsUnreadBtn}
            </div>
        </div>
    );
}



export default NotificationActionsModal;