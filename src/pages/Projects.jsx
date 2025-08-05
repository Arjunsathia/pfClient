import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Projectcard from "../components/Projectcard";
import { allProjecsApi } from "../Services/AllApi";

function Projects() {
  const [projectList, setProjectList] = useState([]);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getData();
    }
  }, []);

  const handleSearch = (val) => {
    const filtered = dataList.filter((item) =>
      item.language?.toLowerCase().includes(val.toLowerCase())
    );
    setProjectList(filtered);
  };

  const getData = async () => {
    const response = await allProjecsApi();
    if (response.status === 200) {
      setProjectList(response.data);
      setDataList(response.data);
    }
  };

  return (
    <>

      <div
        className="container-fluid py-5"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(90deg, #1f1c2c, #928dab)",
          color: "#fff",
        }}
      >
        <div className="container">
          {/* Header & Search */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
            <h2 className="fw-semibold mb-3 mb-md-0 text-light">
              📁 Explore Projects
            </h2>
            <input
              type="search"
              placeholder="Search by Language"
              className="form-control px-4 py-2 rounded-pill shadow-sm"
              style={{
                maxWidth: "300px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#fff",
                backdropFilter: "blur(6px)",
                outline: "none",
              }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Projects List */}
          {projectList.length > 0 ? (
            <div className="row g-4">
              {projectList.map((item, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={index}>
                  <div
                    className="rounded-4 p-3 h-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
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
              <h5 className="text-light">No Projects Available</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;
