import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            setErrorMsg("Password must be at least 6 characters long.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("Passwords do not match!");
            return;
        }

        setErrorMsg("");
        setSuccessMsg("Account created successfully! Redirecting to sign in...");

        // Simulasikan pendaftaran berhasil dan lempar ke page profile (login) setelah 1.5 detik
        setTimeout(() => {
            navigate("/profile");
        }, 1500);
    };

    return (
        <div className="customer-login-page">
            <div className="login-container">
                <div className="login-header-text">
                    <h1>Create Account</h1>
                    <p>Join Ophelia to unlock your personalized dashboard, compile wishlists, and track your dark fashion journey.</p>
                </div>

                <div className="login-form-card">
                    <form onSubmit={handleSubmit} className="customer-form-element">
                        {errorMsg && <div className="alert-msg error-style"><i className="fa-solid fa-circle-exclamation"></i> {errorMsg}</div>}
                        {successMsg && <div className="alert-msg success-style"><i className="fa-solid fa-circle-check"></i> {successMsg}</div>}

                        <div className="input-field-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Enter your full name..."
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-field-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email..."
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-field-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Minimum 6 characters..."
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-field-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                placeholder="Re-enter your password..."
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn-customer-signin">
                            Create Account
                        </button>
                    </form>

                    <div className="register-redirect-footer">
                        <p>Already have an account? <Link to="/profile">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}