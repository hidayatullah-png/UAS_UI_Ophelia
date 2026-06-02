import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulasi otentikasi sederhana untuk Customer
        if (formData.email && formData.password.length >= 6) {
            setSuccessMessage("Sign in successful! Redirecting...");
            setErrorMessage("");

            // Berikan jeda 1.5 detik lalu lempar user kembali ke halaman Home
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } else {
            setErrorMessage("Password must be at least 6 characters long.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="customer-login-page">
            <div className="login-container">

                {/* Sektor Judul Atas */}
                <div className="login-header-text">
                    <h1>Welcome to Ophelia</h1>
                    <p>Sign in to access your dark wardrobe collection, track orders, and unlock exclusive subcultural rewards.</p>
                </div>

                {/* Kotak Utama Form */}
                <div className="login-form-card">
                    <form onSubmit={handleSubmit} className="customer-form-element">

                        {/* Alert Status Info */}
                        {errorMessage && <div className="alert-msg error-style"><i className="fa-solid fa-circle-exclamation"></i> {errorMessage}</div>}
                        {successMessage && <div className="alert-msg success-style"><i className="fa-solid fa-circle-check"></i> {successMessage}</div>}

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
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <div className="forgot-pwd-link-zone">
                                <a href="#forgot">Forgot your password?</a>
                            </div>
                        </div>

                        <button type="submit" className="btn-customer-signin">
                            Sign In
                        </button>
                    </form>

                    {/* Akses Registrasi Akun Baru */}
                    <div className="register-redirect-footer">
                        <p>New to Ophelia? <a href="#register">Create an account</a></p>
                    </div>
                </div>

                {/* Pintu Belakang Menuju Panel Admin */}
                <div className="admin-gateway-link-zone">
                    <p>Are you a team member? <Link to="/admin">Access Staff Terminal</Link></p>
                </div>

            </div>
        </div>
    );
}