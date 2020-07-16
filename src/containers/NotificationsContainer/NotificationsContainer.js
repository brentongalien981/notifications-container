import React from 'react';
import Notification from '../../components/Notifications/Notification';
import NotificationsFilters from '../../components/Notifications/NotificationsFilters/NotificationsFilters';

class NotificationsContainer extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            notifications: [
                { id: 1, type: "Notification-Type", message: "Random notification message." },
                { id: 2, type: "Notification-Type2", message: "Random notification message." },
                { id: 3, type: "Notification-Type3", message: "Random notification message." }
            ]
        };
    }



    render() {

        // Notifications
        const notifications = this.state.notifications.map((notification) => {
            return (
                <Notification notification={notification} />
            );
        });



        //
        return (
            <div>
                <h2>NotificationsContainer</h2>
                <NotificationsFilters></NotificationsFilters>
                {notifications}
            </div>
        );
    }
}

export default NotificationsContainer;