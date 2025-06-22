import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [menuItemCount, setMenuItemCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/count")
      .then((res) => res.json())
      .then(setUserCount)
      .catch((err) => console.error("Error fetching users:", err));

    fetch("http://localhost:8080/api/menu/count")
      .then((res) => res.json())
      .then(setMenuItemCount)
      .catch((err) => console.error("Error fetching menu items:", err));
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content">
        <h2>☕ Admin Dashboard</h2>
        <div className="cards">
          <div className="card">👥 Total Users: {userCount}</div>
          <div className="card">🛒 Total MenuItems: {menuItemCount}</div>
        </div>
      </div>
    </div>
  );
}
