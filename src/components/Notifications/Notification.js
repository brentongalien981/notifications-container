import React from 'react';
import './Notification.css';

// TODO: Remove this later
let appUrl = "http://myg.test:8000";



function getNotificationsSubject(type) {
    switch (type) {
        case "UserLoggedIn":
            return "User Just Logged-In";
        case "UserRegistered":
            return "New User Just Registered";
        case "FollowRequested":
            return "Follow Request";
        case "FollowAccepted":
            return "Follow Request";
        case "CommentCreated":
            return "New Comment to Read";
        case "NewDemoRandomRelationshipInitiated":
            return "Someone Used DemoUser";
        default:
            return "{DEFAULT-NOTIFICATION-SUBJECT}";
    }
}



function getNotificationsMessage(notification, props) {
    let msg = null;
    let comment = "";

    switch (notification.type) {
        case "FollowRequested":
            msg = (
                <>
                    {notification.data?.followerUsername} wants to follow you.&nbsp;
                    <a className="notificationActionLink" action="accept" onClick={(event) => props.actionClicked(event, props.index, notification, "accept")}>accept</a>&nbsp;
                    <a className="notificationActionLink" action="reject" onClick={(event) => props.actionClicked(event, props.index, notification, "reject")}>reject</a>
                </>
            );
            break;
        case "FollowAccepted":
            msg = (
                <>
                    {notification.data?.museUsername} accepted your follow request.&nbsp;
                    <a className="notificationActionLink" action="accept" onClick={(event) => props.actionClicked(event, props.index, notification, "dismiss")}>OK</a>
                </>
            );
            break;
        case "CommentCreated":
            msg = (
                <>
                    {notification.data?.commentorUsername} commented "{notification.data?.message.substring(0, 128)}" on {getCommentableNode(notification.data)}&nbsp;
                </>
            );
            break;
        case "NewDemoRandomRelationshipInitiated":
            msg = (
                <>
                    {notification.data?.museUsername}'s account has been used for demo.<br />
                    The client's IP is ==> {notification.data?.clientIp}.
                </>
            );
            break;
        case "UserRegistered":
            msg = (
                <>
                    <a href={appUrl + "/" + notification.data?.newUsername}>{notification.data?.newUsername}</a> just registered.<br />
                    The email is ==> {notification.data?.newUserEmail}.<br />
                    The client's IP is ==> {notification.data?.clientIp}.
                </>
            );
            break;   
        case "UserLoggedIn":
            msg = (
                <>
                    The email is ==> {notification.data?.userEmail}.<br />
                    The client's IP is ==> {notification.data?.clientIp}.
                </>
            );
            break;                        
        default:
            msg = <>default message for notification</>;
            break;
    }

    return msg;
}



function getCommentableNode(data) {
    let node = null;
    let commentableLabel = "post";
    let commentableLink = "#";

    switch (data.commentableType) {
        case "App\\Video":
            commentableLabel = "video";
            commentableLink = "/videos/" + data.commentableId;
            break;
        case "App\\TimelinePost":
            commentableLabel = "post";
            break;
        case "App\\Photo":
            commentableLabel = "photo";
            break;
    }

    node = (
        <a target="_blank" href={commentableLink}>{commentableLabel}: "{data.commentableHeader}"</a>
    );

    return node;
}



function Notification(props) {

    let notificationSubjectClassName = "notificationType";
    let notificationMessageClassName = "notificationMessage";

    if (props.notification.pivot_read_at == null) {
        notificationSubjectClassName += " unreadNotificationSubject";
        notificationMessageClassName += " unreadNotificationMessage";
    }
     

    return (
        <div className="notification">
            <div className="d-flex justify-content-between">
                <h5 className={notificationSubjectClassName}>{getNotificationsSubject(props.notification.type)}</h5>
                <h6 className="notificationDate">{props.notification.readable_created_at}&nbsp;
                <span className="notificationOptionsBtn badge badge-warning" onClick={(e) => { props.onNotificationOptionsClick(props.index, props.notification.id) }}>
                    <i className="fa fa-ellipsis-v"></i>
                </span>
                </h6>
            </div>

            <div>
                <p className={notificationMessageClassName}>{getNotificationsMessage(props.notification, props)}</p>
            </div>
        </div>
    );
}

export default Notification;