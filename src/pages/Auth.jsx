import React, { useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { LogUserApi, RegUserApi } from "../Services/AllApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authContext } from "../ContextApi/ContextApi";

function Auth() {
  const [authState, setAuthState] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const nav = useNavigate();
  const { setAuthStatus } = useContext(authContext);

  const handleReg = async () => {
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.warning("Enter valid input");
    } else {
      const response = await RegUserApi(userData);
      if (response.status === 201) {
        toast.success("Registration Completed");
        handleAuthState();
        setUserData({ email: "", username: "", password: "" });
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = userData;
    if (!email || !password) {
      toast.warning("Enter valid inputs");
    } else {
      const response = await LogUserApi(userData);
      if (response.status === 200) {
        setAuthStatus(true);
        toast.success("Login success");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem(
          "userData",
          JSON.stringify({
            username: response.data.username,
            github: response.data.github,
            linkedin: response.data.linkedin,
            profile: response.data.profile,
          })
        );
        nav("/");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleAuthState = () => {
    setAuthState(!authState);
    setUserData({ email: "", username: "", password: "" });
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center text-white"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #1f1c2c, #928dab)",
      }}
    >
      <div
        className="p-5 rounded-4 shadow-lg w-100"
        style={{
          maxWidth: "950px",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?semt=ais_hybrid&w=740"
              alt="auth"
              className="w-100 rounded-4"
            />
          </div>

          <div className="col-md-6 px-3">
            <h2 className="fw-bold mb-4 text-info text-center">
              {authState ? "Register" : "Login"}
            </h2>

            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
              <Form.Control
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="name@example.com"
                className="bg-light text-dark border-secondary"
              />
            </FloatingLabel>

            {authState && (
              <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                <Form.Control
                  type="text"
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  placeholder="Your username"
                  className="bg-light text-dark border-secondary"
                />
              </FloatingLabel>
            )}

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
              <Form.Control
                type="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                placeholder="Password"
                className="bg-light text-dark border-secondary"
              />
            </FloatingLabel>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-outline-light px-4"
                onClick={authState ? handleReg : handleLogin}
              >
                {authState ? "Register" : "Login"}
              </button>

              <button
                className="btn btn-link text-info text-decoration-none"
                onClick={handleAuthState}
              >
                {authState ? "Already a user?" : "New User?"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
