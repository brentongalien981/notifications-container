import React from 'react';

function NotificationsFilters(props) {
    return (
        <div>
            <button className="btn btn-info">ALL</button>
            <button className="btn btn-info">UNREAD</button>
            <button className="btn btn-info">READ</button>
        </div>
    );
}



export default NotificationsFilters;