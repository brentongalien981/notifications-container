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
            notifications: [
                // { id: 1, type: "Notification-Type", message: "Random notification message." },
            ]
        };

        // Bind
        this.handleOnUnreadNotificationsFilterClick = this.handleOnUnreadNotificationsFilterClick.bind(this);
        this.handleOnReadNotificationsFilterClick = this.handleOnReadNotificationsFilterClick.bind(this);

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
                <filters.NotificationsFilters
                    filter={this.state.filter}
                    onUnreadNotificationsFilterClick={this.handleOnUnreadNotificationsFilterClick}
                    onReadNotificationsFilterClick={this.handleOnReadNotificationsFilterClick} />
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


        // TODO
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
        console.log("in method:: handleOnReadNotificationsFilterClick()");

        // Update the selected filter button.
        this.setState({ filter: filters.READ });

        this.readNotifications(filters.READ);
    }
}

export default NotificationsContainer;