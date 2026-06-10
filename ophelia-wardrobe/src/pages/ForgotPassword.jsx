import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMsg(`A recovery password link has been sent to ${email}`);
        setEmail("");
    };

    return (
        <div className="customer-login-page">
            <div className="login-container">
                <div className="login-header-text">
                    <h1>Reset Password</h1>
                    <p>Enter your registered email address below and we will send you a recovery link to reset your password safely.</p>
                </div>

                <div className="login-form-card">
                    <form onSubmit={handleSubmit} className="customer-form-element">
                        {successMsg && <div className="alert-msg success-style"><i className="fa-solid fa-circle-check"></i> {successMsg}</div>}

                        <div className="input-field-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email address..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn-customer-signin">
                            Send Reset Link
                        </button>
                    </form>

                    <div className="register-redirect-footer">
                        <p>Back to <Link to="/profile">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}