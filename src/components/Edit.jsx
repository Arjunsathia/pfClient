import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import base_url from "../Services/base_url";
import { toast } from "react-toastify";
// import projects from "../../../pfExpress/Modals/projectModal";
import { editProjectApi } from "../Services/AllApi";
import { editResponseContext } from "../ContextApi/ContextApi";



function Edit({ Project }) {
  const [show, setShow] = useState(false);
  const [newProject, setNewProject] = useState(Project);
  const [preview, setPreview] = useState("");
  const {setEditResponse} = useContext(editResponseContext)

  useEffect(() => {
    if (newProject.image && typeof newProject.image !== "string") {
      setPreview(URL.createObjectURL(newProject.image));
    } else {
      setPreview("");
    }
  }, [newProject.image]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = async () => {
    // Logic to handle the edit operation
    console.log("Edited Project:", newProject);
    const { title, description, language, gitRepo, demo, image } = newProject;
    if (!title || !description || !language || !gitRepo || !demo || !image) {
      toast.error("All fields are required");
    } else {
      if (image.type) {
        const header = {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        };
        const response = await editProjectApi(Project._id, newProject, header);
        if (response.status === 200) {
          toast.success("Project updated successfully");
          setPreview("");
          setEditResponse(response)
        } else {
          toast.error("Failed to update project");
        }
      } else {
        const header = {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        };
        const response = await editProjectApi(Project._id, newProject, header);
        if (response.status === 200) {
          toast.success("Project updated successfully");
          setPreview("");
          setEditResponse(response)
          handleClose();
        } else {
          toast.error("Failed to update project");
          console.log(response);
        }
      }
    }
  };

  return (
    <>
      <button className="btn me-3 border-0" onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Projects Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <label htmlFor="ff">
                <input
                  type="file"
                  style={{ display: "none" }}
                  name=""
                  id="ff"
                />
                <img
                  src={preview ? preview : `${base_url}/projectimg/${Project?.image}`}
                  alt=""
                  className="img-fluid"
                />
              </label>
            </div>
            <div className="col">
              <input
                onChange={(e) => {
                  setNewProject({ ...newProject, title: e.target.value });
                }}
                value={newProject.title}
                type="text"
                placeholder="Enter Title"
                className="form-control mb-3 "
                name=""
                id=""
              />
              <input
                onChange={(e) => {
                  setNewProject({ ...newProject, description: e.target.value });
                }}
                defaultValue={Project?.description}
                type="text"
                placeholder="Enter description"
                className="form-control mb-3"
                name=""
                id=""
              />
              <input
                onChange={(e) => {
                  setNewProject({ ...newProject, language: e.target.value });
                }}
                defaultValue={Project?.language}
                type="text"
                placeholder="Enter language"
                className="form-control mb-3"
                name=""
                id=""
              />
              <input
                onChange={(e) => {
                  setNewProject({ ...newProject, gitRepo: e.target.value });
                }}
                defaultValue={Project?.gitRepo}
                type="text"
                placeholder="Enter Git Repo URl"
                className="form-control mb-3"
                name=""
                id=""
              />
              <input
                onChange={(e) => {
                  setNewProject({ ...newProject, demo: e.target.value });
                }}
                defaultValue={Project?.demo}
                type="text"
                placeholder="Enter Demo URl"
                className="form-control mb-3"
                name=""
                id=""
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
