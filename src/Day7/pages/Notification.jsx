import { useEffect } from "react";

function NotificationPage({ notifications, clearNotifications, setUnreadCount }) {

  useEffect(() => {
    setUnreadCount(0);
  }, []);

  return (
    <div style={{ width:"98vw",padding: "20px" }}>

      <h2>All Notifications</h2>

      {notifications.length > 0 && (
        <button onClick={clearNotifications}>
          Clear All
        </button>
      )}

      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        notifications.map((n) => (
          <div key={n.id}>
            {n.message}
          </div>
        ))
      )}

    </div>
  );
}

export default NotificationPage;