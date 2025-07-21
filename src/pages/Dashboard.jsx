import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import AddProject from "../components/AddProject";
import Profile from "../components/Profile";
import { userProjectApi, deleteProjectApi } from "../Services/AllApi";
import { toast } from "react-toastify";
import Edit from "../components/Edit";
import {
  addResponseContext,
  editResponseContext,
} from "../ContextApi/ContextApi";

function Dashboard() {
  const [user, setUser] = useState("");
  const [Project, setProject] = useState([]);
  const { addResponse } = useContext(addResponseContext);
  const { editResponse }= useContext(editResponseContext);

  useEffect(() => {
    if (sessionStorage.getItem("userData")) {
      setUser(JSON.parse(sessionStorage.getItem("userData")))
      getData();
    }
  }, [addResponse, editResponse]);

  const getData = async () => {
    const response = await userProjectApi();
    console.log(response);
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
      <div className="container-fluid" style={{ minHeight: "65vh" }}>
        <h2>DashBoard</h2>
        <h2>
          Welcome , <span className="text-warning">{user?.username}</span>
        </h2>
        <div className="row">
          <div className="col-9">
            <AddProject />
            <div className="w-100 border border-3 border-light p-2 mt-4">
              {Project.length > 0 ? (
                <>
                  {Project.map((item) => (
                    <div className="m-3 border border-2 border-warning p-2 d-flex justify-content-between align-items-center">
                      <h5>{item.title}</h5>
                      <div>
                        <a href={item.gitrepo} target="_blank" className="me-4">
                          <i className="fa-brands fa-github"></i>
                        </a>
                        <Edit Project={item} />

                        <button
                          className="btn me-3 border-0"
                          onClick={() => handelDelete(item._id)}
                        >
                          <i className="fa-solid fa-trash"></i>{" "}
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <h2 className="text-center text-danger">No Project added</h2>
              )}
            </div>
          </div>
          <div className="col-3">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
