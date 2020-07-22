import React from 'react';
import './NotificationsFilters.css';

export function NotificationsFilters(props) {

    const selectedBtnClassName = "btn btn-primary";
    const defaultBtnClassName = "btn btn-outline-secondary";

    return (
        <div className="NotificationsFilters">
            <button id="allNotificationsFilterBtn" className={props.filter == ALL ? selectedBtnClassName : defaultBtnClassName} onClick={props.onAllNotificationsFilterClick}>All</button>
            <button id="unreadNotificationsFilterBtn" className={props.filter == UNREAD ? selectedBtnClassName : defaultBtnClassName} onClick={props.onUnreadNotificationsFilterClick}>Unread</button>
            <button id="readNotificationsFilterBtn" className={props.filter == READ ? selectedBtnClassName : defaultBtnClassName} onClick={props.onReadNotificationsFilterClick}>Read</button>
        </div>
    );
}


export const ALL = 1;
export const UNREAD = 2;
export const READ = 3;