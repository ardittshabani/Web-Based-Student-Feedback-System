import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await axios.get('/api/notifications');
            setNotifications(response.data);
        };

        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="notifications">
            {notifications.map((notification) => (
                <div key={notification.id} className="notification">
                    {notification.message}
                </div>
            ))}
        </div>
    );
};

export default Notifications;
