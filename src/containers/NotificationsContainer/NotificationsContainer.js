import React from 'react';
import Notification from '../../components/Notifications/Notification';
import * as filters from '../../components/Notifications/NotificationsFilters/NotificationsFilters';
import Loader from '../../components/Loader/Loader';
import NotificationActionsModal from '../../components/Notifications/NotificationActionsModal/NotificationActionsModal';

class NotificationsContainer extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isModalShown: false,
            isReadingNotifications: false,
            notifications: [
                // { id: 1, type: "Notification-Type", message: "Random notification message." },
            ]
        };
    }



    render() {

        // Notifications
        const notifications = this.state.notifications.map((notification, i) => {
            return (
                <Notification notification={notification} key={i} />
            );
        });

        const notificationsContainer = <div>{notifications}</div>;



        // loader
        let loaderSection = (
            <div>
                <button className="btn btn-primary">show more</button>
            </div>
        );

        if (this.state.isReadingNotifications) {
            loaderSection = (
                <div>
                    <Loader />
                </div>
            );
        }





        // modal
        const modal = this.state.isModalShown ? <NotificationActionsModal /> : null;



        //
        return (
            <div>
                <h2>NotificationsContainer</h2>
                <filters.NotificationsFilters filter={filters.ALL} />
                {notificationsContainer}
                {loaderSection}
                {modal}
            </div>
        );
    }



    componentDidMount() {
        this.readNotifications();
    }



    readNotifications() {
        if (this.state.isReadingNotifications) { return; }

        this.setState({ isReadingNotifications: true });

        // TODO
    }
}

export default NotificationsContainer;