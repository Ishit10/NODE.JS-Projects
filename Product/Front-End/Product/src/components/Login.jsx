import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate("/registration");
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9092/users/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/products");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Invalid email or password.");
        
      } else {
        setError("Error connecting to the server. Please try again later.");
      }
    }
  };

  return (
    <section className="d-flex vh-100 justify-content-center align-items-center bg-dark text-white">
      <div className="card bg-secondary text-light p-4" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-3">Login</h2>
          <p className="text-center text-white-50 mb-4">Please enter your login and password!</p>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                Login
              </button>
              <button className="btn btn-secondary" type="button" onClick={handleRegistration}>
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
