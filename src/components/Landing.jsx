import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <body id="font">
      
   
    <div className="landing">
      {/* TOP NAVIGATION */}
      <nav className="navbar">
        <div className="logo">☕ Cafe</div>
        <div className="nav-buttons">
          <button onClick={() => navigate("/userLogin")} className="nav-btn">Login</button>
          <button onClick={() => navigate("/register")} className="nav-btn">Register</button>
        </div>
      </nav>

      <header className="landing-header">
        <div className="overlay"></div>
        <div className="header-content">
          <h1>Welcome to Cafe</h1>
          <p>Your favorite coffee, just a click away.</p>
          <button className="btn btn-light" onClick={() => navigate("/register")}>Get Started</button>
        </div>
      </header>

      <section className="features">
        <div className="container text-center">
          <h2>What We Offer</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <i className="fas fa-coffee fa-3x text-warning"></i>
              <h4 className="mt-2">Delicious Menu</h4>
              <br />
              <p>View and order from our diverse selection of hot & cold beverages.</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-user-check fa-3x text-info"></i>
              <h4 className="mt-2">Easy Login</h4>
              <br />
              <p>Quick and secure user login and registration for everyone.</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-chart-line fa-3x text-success"></i>
              <h4 className="mt-2">Our Services</h4>
              <br />
              <p>Get Your Coffe I a Minute</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center text-light py-3">
    Crafted with ☕ and ❤️.
      </footer>
    </div>
     </body>
  );
}
