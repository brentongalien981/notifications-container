import React from 'react';
import Notification from '../../components/Notifications/Notification';
import * as filters from '../../components/Notifications/NotificationsFilters/NotificationsFilters';
import Loader from '../../components/Loader/Loader';
import NotificationActionsModal from '../../components/Notifications/NotificationActionsModal/NotificationActionsModal';
import Core from '../../ysp-core/Core';

class NotificationsContainer extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isModalShown: false,
            isReadingNotifications: false,
            filter: filters.ALL,
            selectedNotificationIndex: null,
            selectedNotificationId: null,
            notifications: [
                // { id: 1, type: "Notification-Type", message: "Random notification message." },
            ]
        };

        // Bind
        this.handleOnUnreadNotificationsFilterClick = this.handleOnUnreadNotificationsFilterClick.bind(this);
        this.handleOnReadNotificationsFilterClick = this.handleOnReadNotificationsFilterClick.bind(this);
        this.handleOnAllNotificationsFilterClick = this.handleOnAllNotificationsFilterClick.bind(this);
        this.handleOnNotificationOptionsClick = this.handleOnNotificationOptionsClick.bind(this);
    }



    render() {

        // Notifications
        const notifications = this.state.notifications.map((notification, i) => {
            return (
                <Notification
                    notification={notification}
                    key={i}
                    index={i}
                    onNotificationOptionsClick={this.handleOnNotificationOptionsClick} />
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
                <filters.NotificationsFilters
                    filter={this.state.filter}
                    onUnreadNotificationsFilterClick={this.handleOnUnreadNotificationsFilterClick}
                    onReadNotificationsFilterClick={this.handleOnReadNotificationsFilterClick}
                    onAllNotificationsFilterClick={this.handleOnAllNotificationsFilterClick} />
                {notificationsContainer}
                {loaderSection}
                {modal}
            </div>
        );
    }



    componentDidMount() {
        this.readNotifications();
    }



    readNotifications(filter = filters.ALL) {

        //
        if (this.state.isReadingNotifications) { return; }

        this.setState({ isReadingNotifications: true });


        // 
        Core.yspCrud({
            url: "/notifications",
            params: {
                api_token: this.props.token,
                filter: filter
            },
            neededResponseParams: ["notifications"],
            callBackFunc: (requestData, json) => {
                this.setState({
                    notifications: json.notifications,
                    isReadingNotifications: false
                });
            }
        });
    }



    handleOnUnreadNotificationsFilterClick() {

        // Update the selected filter button.
        this.setState({ filter: filters.UNREAD });

        this.readNotifications(filters.UNREAD);
    }



    handleOnReadNotificationsFilterClick() {

        // Update the selected filter button.
        this.setState({ filter: filters.READ });

        this.readNotifications(filters.READ);
    }



    handleOnAllNotificationsFilterClick() {
        this.setState({ filter: filters.ALL });
        this.readNotifications();
    }



    handleOnNotificationOptionsClick(index, id) {

        // Show the modal.
        this.setState({ 
            isModalShown: true,
            selectedNotificationIndex: index,
            selectedNotificationId: id
        });
    }
}

export default NotificationsContainer;