import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };//spread opereator use panni previos value retain panromm

  const validate = () => {
    const newErrors = {};
    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegx = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegx.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegx.test(formData.phone.trim())) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegx.test(formData.password)) {
      newErrors.password = "Password must be strong (8+ chars, upper, lower, digit, symbol)";
    }

    if (!formData.cpassword) {
      newErrors.cpassword = "Confirm your password";
    } else if (formData.cpassword !== formData.password) {
      newErrors.cpassword = "Passwords do not match";
    }

    setErrors(newErrors);//err.email error.user
    return Object.keys(newErrors).length === 0;  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) { //respons ok na success
        alert("Registered successfully!");
        setSubmitted(true);
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
        });
        setErrors({});
      } else {
        const data = await res.json();
        alert("Error: " + (data.message || "Something went wrong"));
      }
    } catch (err) {
      console.error(err);
      alert("Network or server error");
    }
  };

return (
  <div className="register-page">
    <div className="page-top-right">
      <button className="nav-home" onClick={() => navigate("/")}>Home</button>
    </div>

    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        {["username", "email", "phone", "password", "cpassword"].map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type={field.includes("password") ? "password" : "text"}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className="form-control"
              required
            />
            {errors[field] && <p className="error">{errors[field]}</p>}
          </div>
        ))}
        <button className="btn btn-success btn-block" type="submit">
          Submit
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <span className="link-text" onClick={() => navigate("/userLogin")}>
            Login here
          </span>
        </p>
      </form>
    </div>
  </div>
);

}
