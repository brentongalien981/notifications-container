import React from 'react';

export function NotificationsFilters(props) {

    const selectedBtnClassName = "btn btn-primary";
    const defaultBtnClassName = "btn btn-outline-secondary";

    return (
        <div>
            <button className={props.filter == ALL ? selectedBtnClassName : defaultBtnClassName}>ALL</button>
            <button className={props.filter == UNREAD ? selectedBtnClassName : defaultBtnClassName} onClick={props.onUnreadNotificationsFilterClick}>UNREAD</button>
            <button className={props.filter == READ ? selectedBtnClassName : defaultBtnClassName}>READ</button>
        </div>
    );
}


export const ALL = 1;
export const UNREAD = 2;
export const READ = 3;