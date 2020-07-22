import React from 'react';
import Notification from '../../components/Notifications/Notification';
import * as filters from '../../components/Notifications/NotificationsFilters/NotificationsFilters';
import Loader from '../../components/Loader/Loader';
import NotificationActionsModal from '../../components/Notifications/NotificationActionsModal/NotificationActionsModal';
import Core from '../../ysp-core/Core';
import './NotificationsContainer.css';

class NotificationsContainer extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isModalShown: false,
            isReadingNotifications: false,
            isDeletingNotification: false,
            isUpdatingNotification: false,
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
        this.handleOnModalClose = this.handleOnModalClose.bind(this);
        this.handleOnDeleteNotification = this.handleOnDeleteNotification.bind(this);
        this.handleOnMarkNotificationAsRead = this.handleOnMarkNotificationAsRead.bind(this);
        this.handleOnMarkNotificationAsUnread = this.handleOnMarkNotificationAsUnread.bind(this);
        this.handleShowMoreNotifications = this.handleShowMoreNotifications.bind(this);
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
                <button className="btn btn-primary" onClick={this.handleShowMoreNotifications}>show more</button>
            </div>
        );

        if (this.state.isReadingNotifications) {
            loaderSection = (
                <div>
                    <Loader comment="loading items..." />
                </div>
            );
        }





        // modal
        const modal = this.state.isModalShown
            ? <NotificationActionsModal
                filter={this.state.filter}
                onModalClose={this.handleOnModalClose}
                onDeleteNotification={this.handleOnDeleteNotification}
                onMarkNotificationAsRead={this.handleOnMarkNotificationAsRead}
                onMarkNotificationAsUnread={this.handleOnMarkNotificationAsUnread} />
            : null;



        //
        return (
            <div id="notificationsContainer">
                <h2 id="notificationsHeader">Notifications</h2>
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
        let numOfShownNotificatios = this.state.notifications.length;
        if (filter !== this.state.filter) { numOfShownNotificatios = 0; }


        // 
        Core.yspCrud({
            url: "/notifications",
            params: {
                api_token: this.props.token,
                filter: filter,
                numOfShownNotificatios: numOfShownNotificatios
            },
            neededResponseParams: ["notifications"],
            callBackFunc: (requestData, json) => {

                let updatedNotifications = this.state.notifications;
                updatedNotifications = updatedNotifications.concat(json.notifications);

                if (filter !== this.state.filter) {
                    updatedNotifications = json.notifications;
                }

                this.setState({
                    notifications: updatedNotifications,
                    isReadingNotifications: false,
                    filter: filter
                });
            }
        });
    }



    handleOnUnreadNotificationsFilterClick() {

        // Update the selected filter button.
        // this.setState({ filter: filters.UNREAD });

        this.readNotifications(filters.UNREAD);
    }



    handleOnReadNotificationsFilterClick() {

        // Update the selected filter button.
        // this.setState({ filter: filters.READ });

        this.readNotifications(filters.READ);
    }



    handleOnAllNotificationsFilterClick() {
        // this.setState({ filter: filters.ALL });
        this.readNotifications();
    }



    handleOnNotificationOptionsClick(index, id) {

        // Show the modal.
        this.setState({
            isModalShown: true,
            selectedNotificationIndex: index,
            selectedNotificationId: id
        });

        // TODO: Delete this later.
        console.log("selectedNotificationIndex ==> " + index);
        console.log("selectedNotificationId ==> " + id);
    }



    handleOnModalClose() {
        this.setState({
            isModalShown: false
        });
    }



    handleOnDeleteNotification() {

        //
        if (this.state.isDeletingNotification) { return; }

        this.setState({ isDeletingNotification: true });


        //
        Core.yspCrud({
            url: "/notifications-users",
            method: "delete",
            params: {
                api_token: this.props.token,
                selectedNotificationId: this.state.selectedNotificationId
            },
            neededResponseParams: ["message", "selectedNotificationId"],
            callBackFunc: (requestData, json) => {
                let updatedNotifications = this.state.notifications;
                updatedNotifications.splice(this.state.selectedNotificationIndex, 1);

                this.setState({
                    notifications: updatedNotifications,
                    isModalShown: false,
                    isDeletingNotification: false
                });
            }
        });
    }



    handleOnMarkNotificationAsRead() {
        this.markNotification(filters.READ);
    }



    handleOnMarkNotificationAsUnread() {
        this.markNotification(filters.UNREAD);
    }



    markNotification(mark) {
        //
        if (this.state.isUpdatingNotification) { return; }

        this.setState({ isUpdatingNotification: true });


        //
        Core.yspCrud({
            url: "/notifications-users",
            method: "patch",
            params: {
                api_token: this.props.token,
                selectedNotificationId: this.state.selectedNotificationId,
                mark: mark
            },
            neededResponseParams: ["message", "selectedNotificationId", "updatedNotification"],
            callBackFunc: (requestData, json) => {

                // 
                let updatedNotifications = this.state.notifications;

                switch (this.state.filter) {
                    case filters.ALL:

                        updatedNotifications[this.state.selectedNotificationIndex] = json.updatedNotification;

                        this.setState({
                            notifications: updatedNotifications,
                            isModalShown: false,
                            isUpdatingNotification: false
                        });
                        break;

                    case filters.UNREAD:

                        updatedNotifications.splice(this.state.selectedNotificationIndex, 1);

                        this.setState({
                            notifications: updatedNotifications,
                            isModalShown: false,
                            isUpdatingNotification: false
                        });
                        break;

                    case filters.READ:

                        updatedNotifications.splice(this.state.selectedNotificationIndex, 1);

                        this.setState({
                            notifications: updatedNotifications,
                            isModalShown: false,
                            isUpdatingNotification: false
                        });
                        break;
                }
            }
        });
    }



    handleShowMoreNotifications() {
        if (this.state.isReadingNotifications) { return; }
        this.setState({ isReadingNotifications: true });

        this.readNotifications(this.state.filter);
    }
}

export default NotificationsContainer;