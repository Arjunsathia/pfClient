import React, { useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { LogUserApi, RegUserApi } from "../Services/AllApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authContext } from "../ContextApi/ContextApi";
import Profile from "../components/Profile";

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
    console.log(userData);
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.warning("Enter valid input");
    } else {
      // console.log("Sending to backend:", userData)
      const response = await RegUserApi(userData);
      console.log(response);
      if (response.status === 201) {
        toast.success("Registration Competed");
        handleAuthState();
        userData({
          email: "",
          username: "",
          password: "",
        });
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = userData;
    if ((!email, !password)) {
      toast.warning("Enter valid inputs");
    } else {
      const response = await LogUserApi(userData);
      console.log(response);
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
  };
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="p-3 border border-light border-3 w-75">
        <div className="row">
          <div className="col">
            <img
              src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?semt=ais_hybrid&w=740"
              alt=""
              className="w-75"
            />
          </div>
          <div className="col">
            <h2>{authState ? <>Registration</> : <>Login</>}</h2>
            <div className="mt-4 ">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                  placeholder="name@example.com"
                  value={userData.email}
                />
              </FloatingLabel>
              {authState && (
                <>
                  <FloatingLabel
                    controlId="floatingInp"
                    label="user Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setUserData({ ...userData, username: e.target.value });
                      }}
                      placeholder="username..."
                      value={userData.username}
                    />
                  </FloatingLabel>
                </>
              )}
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                  placeholder="Password"
                  value={userData.password}
                />
              </FloatingLabel>
              <div className="d-flex justify-content-between mt-5">
                {authState ? (
                  <button className="btn btn-success" onClick={handleReg}>
                    Register
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={handleLogin}>
                    Login
                  </button>
                )}
                <button className="btn btn-link" onClick={handleAuthState}>
                  {authState ? "Already a user?" : "New User?"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
