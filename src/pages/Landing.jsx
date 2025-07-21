import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Projectcard from "../components/Projectcard";
import { allProjecsApi } from "../Services/AllApi";

function Landing() {
  const [logState, setLogState] = useState(false);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    getData();
    if (sessionStorage.getItem("token")) {
      setLogState(true);
    } else {
      setLogState(false);
    }
  }, []);

  const getData = async () => {
    const response = await allProjecsApi();
    console.log(response);
    if (response.status === 200) {
      setSamples(response.data.slice(0, 3));
    } else {
      console.error("Failed to fetch projects");
    }
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="w-100 row" style={{ minHeight: "70vh" }}>
          <div className="col-sm-12 col-md-6 d-flex justify-content-center flex-column">
            <h1>
              Welcome to <span className="text-info"> ProjectFare</span>
            </h1>
            <h6>
              Store, manage, and showcase your projects — all in one place.
            </h6>
            <p style={{ textAlign: "justify" }}>
              Whether you're a developer, student, or creator, ProjectHub lets
              you upload your work, write detailed descriptions, and organize
              everything beautifully. Share your projects with the world or keep
              them private — your work, your rules.
            </p>
            <h6>
              🔐 Simple & Secure | 🗂 Easy Project Management | 🌐 Public or
              Private Projects
            </h6>
            <div className="d-grid">
              {logState ? (
                <Link className="btn btn-success" to={"/dash"}>
                  DashBoard
                </Link>
              ) : (
                <Link className="btn btn-info" to={"/auth"}>
                  {" "}
                  Explore now...
                </Link>
              )}
            </div>
          </div>
          <div className="col-sm-12 col-md-6 d-flex justify-content-center">
            <img
              className="img-fluid"
              src="https://tse2.mm.bing.net/th?id=OIF.T2UAh9IE10I0hGJ6tRXjtw&pid"
              alt=""
              style={{ height: "35rem" }}
            />
          </div>
        </div>
        <div className="w-100 my-5">
          <h3>projects you may like...</h3>
          <div className="d-flex justify-content-around my-5">
            {
              samples.length > 0 ? samples.map((item) => <Projectcard project={item} />)
              :
              <h4>No projects available</h4>
            }
          </div>
          <div className="text-center">
            <Link to={"/allproject"}>View more...</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
