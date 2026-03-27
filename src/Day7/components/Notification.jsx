import { useEffect } from "react";

function Notification({ notifications, removeNotification }) {
  useEffect(() => {
    notifications.forEach((notif) => {
      setTimeout(() => {
        removeNotification(notif.id);
      }, 3000); // auto remove after 3 sec
    });
  }, [notifications]);

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      zIndex: 9999
    }}>
      {notifications.map((notif) => (
        <div key={notif.id} style={{
          backgroundColor: notif.type === "success" ? "green" : "red",
          color: "white",
          padding: "10px 15px",
          borderRadius: "5px",
          minWidth: "200px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}>
          {notif.message}
        </div>
      ))}
    </div>
  );
}

export default Notification;