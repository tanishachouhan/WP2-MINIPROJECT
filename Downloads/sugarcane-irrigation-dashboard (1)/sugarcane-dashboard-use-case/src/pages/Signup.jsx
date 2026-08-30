import { useState } from "react";
import { Link } from "react-router-dom";
import { getPasswordChecks, isIdValid, isPasswordValid } from "../utils/validators";
import "./Auth.css";

const initialForm = {
  name: "",
  id: "",
  location: "",
  password: "",
  confirmPassword: "",
};

export default function Signup({ onSignup }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const passwordChecks = getPasswordChecks(form.password);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};

    if (!form.name.trim()) {
      next.name = "Full name is required.";
    }

    if (!form.id.trim()) {
      next.id = "User ID is required.";
    } else if (!isIdValid(form.id)) {
      next.id = "User ID must be at least 4 characters (letters, numbers, '.', '_').";
    }

    if (!form.location.trim()) {
      next.location = "Farm location (village/city) is required.";
    }

    if (!form.password) {
      next.password = "Password is required.";
    } else if (!isPasswordValid(form.password)) {
      next.password = "Password must be at least 8 characters and include a special character.";
    }

    if (!form.confirmPassword) {
      next.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      next.confirmPassword = "Passwords do not match.";
    }

    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No backend — this is a mock sign-up for the prototype.
      onSignup();
    }
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

        <h2 className="auth-heading">Create Account</h2>
        <p className="auth-tagline">Set up your farmer account to get started.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Ramesh Patil"
              value={form.name}
              onChange={handleChange}
              className={submitted && errors.name ? "input-error" : ""}
            />
            {submitted && errors.name && <p className="field-error">{errors.name}</p>}
          </div>

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
            <label htmlFor="location">Farm Location (Village / City)</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Karad, Satara"
              value={form.location}
              onChange={handleChange}
              className={submitted && errors.location ? "input-error" : ""}
            />
            {submitted && errors.location && (
              <p className="field-error">{errors.location}</p>
            )}
            <p className="field-hint">Used to fetch local weather for your dashboard.</p>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className={submitted && errors.password ? "input-error" : ""}
            />
            <ul className="password-checklist">
              <li className={passwordChecks.length ? "check-pass" : "check-fail"}>
                <span>{passwordChecks.length ? "✅" : "⭕"}</span> At least 8 characters
              </li>
              <li className={passwordChecks.special ? "check-pass" : "check-fail"}>
                <span>{passwordChecks.special ? "✅" : "⭕"}</span> At least 1 special character (!@#$%...)
              </li>
            </ul>
            {submitted && errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={submitted && errors.confirmPassword ? "input-error" : ""}
            />
            {submitted && errors.confirmPassword && (
              <p className="field-error">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="auth-submit-btn">
            Create Account →
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
