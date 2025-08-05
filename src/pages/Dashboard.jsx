import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import AddProject from "../components/AddProject";
import Profile from "../components/Profile";
import Projectcard from "../components/Projectcard";
import Edit from "../components/Edit";
import { userProjectApi, deleteProjectApi } from "../Services/AllApi";
import { toast } from "react-toastify";
import {
  addResponseContext,
  editResponseContext,
} from "../ContextApi/ContextApi";
import Footer from "../components/Footer";

function Dashboard() {
  const [user, setUser] = useState("");
  const [Project, setProject] = useState([]);
  const { addResponse } = useContext(addResponseContext);
  const { editResponse } = useContext(editResponseContext);

  useEffect(() => {
    if (sessionStorage.getItem("userData")) {
      setUser(JSON.parse(sessionStorage.getItem("userData")));
      getData();
    }
  }, [addResponse, editResponse]);

  const getData = async () => {
    const response = await userProjectApi();
    if (response.status === 200) {
      setProject(response.data);
    }
  };

  const handelDelete = async (id) => {
    const response = await deleteProjectApi(id);
    if (response.status === 200) {
      toast.success("Project deleted successfully");
      getData();
    } else {
      toast.error("Failed to delete project");
    }
  };

  return (
    <>
      <Header />

      <div
        className="container-fluid py-5"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(90deg, #1f1c2c, #928dab)",
          color: "#fff",
        }}
      >
        <div className="container">
          <h2 className="mb-4 fw-semibold">
            Welcome, <span className="text-info">{user?.username}</span>
          </h2>
          <div className="row">
            {/* MAIN SECTION */}
            <div className="col-lg-9">
              <div
                className="p-4 rounded-4 mb-4"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <AddProject />
              </div>

              {/* PROJECT LIST */}
              {Project.length > 0 ? (
                <div className="row g-4">
                  {Project.map((item) => (
                    <div key={item._id} className="col-12 col-md-6 col-lg-4">
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
                        <Projectcard project={item} onDelete={handelDelete}>
                          <Edit Project={item} />
                        </Projectcard>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h5 className="text-center text-light mt-4">
                  No Projects Added Yet
                </h5>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="col-lg-3">
              <div
                className="p-4 rounded-4"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Profile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
