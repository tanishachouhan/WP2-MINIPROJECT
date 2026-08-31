import { useState } from "react";
import { Link } from "react-router-dom";
import { isIdValid, isPasswordValid } from "../utils/validators";
import "./Auth.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ id: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.id.trim()) {
      next.id = "User ID is required.";
    } else if (!isIdValid(form.id)) {
      next.id = "User ID must be at least 4 characters (letters, numbers, '.', '_').";
    }

    if (!form.password) {
      next.password = "Password is required.";
    } else if (!isPasswordValid(form.password)) {
      next.password = "Password must be at least 8 characters and include a special character.";
    }

    return next;
  }

function handleSubmit(e) {
  e.preventDefault();
  setSubmitted(true);

  const validationErrors = validate();
  setErrors(validationErrors);

  // First check whether the fields themselves are valid
  if (Object.keys(validationErrors).length > 0) {
    return;
  }

  // Demo credentials
  const DEMO_ID = "ramesh.patil";
  const DEMO_PASSWORD = "Sugarcane@123";

  if (form.id !== DEMO_ID || form.password !== DEMO_PASSWORD) {
    setErrors({
      login: "Invalid User ID or password. Please use the demo credentials."
    });
    return;
  }

  // Successful demo login
  onLogin();
}

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">🌱</span>
          <div>
            <h1 className="auth-title">AgriSmart</h1>
            <p className="auth-subtitle">Smart Sugarcane Irrigation Dashboard</p>
          </div>
        </div>

        <h2 className="auth-heading">Login</h2>
        <p className="auth-tagline">Welcome back! Please enter your details.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="id">User ID</label>
            <input
              id="id"
              name="id"
              type="text"
              placeholder="e.g. ramesh.patil"
              value={form.id}
              onChange={handleChange}
              className={submitted && errors.id ? "input-error" : ""}
            />
            {submitted && errors.id && <p className="field-error">{errors.id}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className={submitted && errors.password ? "input-error" : ""}
            />
            {submitted && errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="auth-submit-btn">
            Login →
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
