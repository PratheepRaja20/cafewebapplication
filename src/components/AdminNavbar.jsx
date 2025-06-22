import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

export default function AdminNavbar() {
    const navigate = useNavigate();

    return (
        <div className="admin-navbar">
            <h3>Cafe Admin</h3>
            <nav>
                <button onClick={() => navigate("/admin")}>Home</button>
                <button onClick={() => navigate("/admin/users")}>Users</button>
                <button onClick={() => navigate("/admin/menu")}>Menu</button>
                <button onClick={() => navigate("/")}>Logout</button>
            </nav>
        </div>
    );
}
