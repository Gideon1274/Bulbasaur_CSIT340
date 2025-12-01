import React, { useState } from "react";
import { fetchReportData } from "./api";

function LoginRegister({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const data = await fetchReportData("/api/customers/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setMessage(`Login successful! Welcome, ${data.name}.`);
      onLoginSuccess(data);
    } catch (error) {
      setMessage(
        `Login failed: ${error.message || "Invalid email or password."}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (isRegistering && !name.trim()) {
      setMessage("Please enter your name.");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchReportData("/api/customers/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      setMessage(
        `Registration successful! Welcome, ${data.name}. Logging you in…`
      );
      setTimeout(() => onLoginSuccess(data), 1000);
    } catch (error) {
      setMessage(
        `Registration failed: ${error.message || "Please try again."}`
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setMessage("");
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>
          {isRegistering ? "Create Account" : "Customer Login"}
        </h2>

        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          style={formStyle}
        >
          {isRegistering && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              required
              disabled={loading}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
            disabled={loading}
          />

          <button type="submit" style={loginButtonStyle} disabled={loading}>
            {loading ? "Loading..." : isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <div style={footerStyle}>
          <p style={footerTextStyle}>
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <button
            onClick={toggleMode}
            style={registerButtonStyle}
            disabled={loading}
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </div>

        {message && (
          <p
            style={{
              ...messageStyle,
              color:
                message.includes("failed") || message.includes("Please")
                  ? "#d9534f"
                  : "#5cb85c",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================== STYLES =========================== */
const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle = {
  width: "380px",
  padding: "30px 40px",
  backgroundColor: "#e8f5e9", // exact light-green background
  borderRadius: "12px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const titleStyle = {
  margin: "0 0 25px 0",
  fontSize: "24px",
  color: "#2e7d32", // dark green title
  fontWeight: "600",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const inputStyle = {
  padding: "12px 14px",
  fontSize: "15px",
  borderRadius: "6px",
  border: "1px solid #a5d6a7",
  backgroundColor: "#ffffff",
  outline: "none",
};

const loginButtonStyle = {
  marginTop: "10px",
  padding: "12px",
  fontSize: "16px",
  fontWeight: "bold",
  color: "white",
  backgroundColor: "#2e7d32", // dark-green button
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const footerStyle = {
  marginTop: "20px",
};

const footerTextStyle = {
  margin: "0 0 8px 0",
  fontSize: "14px",
  color: "#555",
};

const registerButtonStyle = {
  padding: "8px 20px",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#2e7d32",
  backgroundColor: "transparent",
  border: "2px solid #2e7d32",
  borderRadius: "6px",
  cursor: "pointer",
};

const messageStyle = {
  marginTop: "15px",
  fontSize: "14px",
  fontWeight: "500",
};

export default LoginRegister;
