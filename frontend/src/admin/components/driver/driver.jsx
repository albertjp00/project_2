import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:2000");

const AdminDashboard = () => {
  const [location, setLocation] = useState({ lat: 48.8566, lng: 2.3522 });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          socket.emit("updateLocation", newLocation); // Send location to users
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  return (
    <div>
      <h2>Admin (Driver) Dashboard</h2>
      <p>Current Location: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>
    </div>
  );
};

export default AdminDashboard;
