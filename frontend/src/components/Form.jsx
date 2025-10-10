import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState(method === "login" ? "guest" : "");
  const [password, setPassword] = useState(
    method === "login" ? "#demo2@25" : ""
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method == "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>

      {method === "login" && (
        <div
          style={{
            backgroundColor: "#e8f5e9",
            border: "1px solid #4CAF50",
            borderRadius: "5px",
            padding: "10px 15px",
            marginBottom: "15px",
            fontSize: "14px",
            color: "#2e7d32",
            textAlign: "center",
          }}
        >
          <strong>🎯 For Recruiters: </strong> Demo credentials pre-filled for
          quick access
        </div>
      )}

      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button
        className="form-button"
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        {name}
      </button>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        {method === "login" ? (
          <>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#4CAF50",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register here
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#4CAF50",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login here
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

export default Form;
