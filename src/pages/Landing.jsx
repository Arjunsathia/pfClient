import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Projectcard from "../components/Projectcard";
import { allProjecsApi } from "../Services/AllApi";

function Landing() {
  const [logState, setLogState] = useState(false);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    getData();
    setLogState(!!sessionStorage.getItem("token"));
  }, []);

  const getData = async () => {
    const response = await allProjecsApi();
    if (response?.status === 200) {
      setSamples(response.data.slice(0, 3));
    } else {
      console.error("Failed to fetch projects");
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #1f1c2c, #928dab)",
        color: "#fff",
      }}
    >
      {/* HERO SECTION */}
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-md-6 px-4">
            <div
              className="p-4 rounded-4 shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h1 className="mb-3 fw-bold">
                Welcome to <span className="text-info">CodeDock</span>
              </h1>
              <p className="lead">
                Store, manage, and showcase your projects — all in one place.
              </p>
              <p style={{ textAlign: "justify" }}>
                Whether you're a developer, student, or creator, CodeDock lets
                you upload your work, write detailed descriptions, and organize
                everything beautifully. Share your projects with the world or
                keep them private — your work, your rules.
              </p>
              <ul
                className="mt-3"
                style={{ listStyle: "none", paddingLeft: 0 }}
              >
                <li>🔐 Simple & Secure</li>
                <li>🗂 Easy Project Management</li>
                <li>🌐 Public or Private Projects</li>
              </ul>
              <div className="mt-4">
                {logState ? (
                  <Link className="btn btn-success px-4 py-2" to="/dash">
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link className="btn btn-info px-4 py-2" to="/auth">
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src="/gpt.png"
              className="img-fluid rounded-4"
              alt="Hero"
              style={{
                maxHeight: "32rem",
                // border: "1px solid rgba(255, 255, 255, 0.1)",
                // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
        </div>

        {/* SAMPLE PROJECTS */}
        <div className="mt-5">
          <h3 className="text-center mb-4 fw-semibold text-white">
            Sample Projects
          </h3>

          {samples.length > 0 ? (
            <div className="row g-4">
              {samples.map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div
                    className="rounded-4 p-3 h-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0px)")
                    }
                  >
                    <Projectcard project={item} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-4">
              <h5 className="text-light">No projects available</h5>
            </div>
          )}

          <div className="text-center mt-4">
            <Link
              to={"/allproject"}
              className="btn btn-outline-light px-4 py-2"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
