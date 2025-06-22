import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css"; // navbar styles already exist here

export default function UserNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // clear login details
        navigate("/"); // navigate to login/home
    };

    return (
        <div className="user-navbar">
            <h3>Cafe User</h3>
            <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    );
}
