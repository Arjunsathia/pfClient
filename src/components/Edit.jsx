import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import base_url from "../Services/base_url";
import { toast } from "react-toastify";
import { editProjectApi } from "../Services/AllApi";
import { editResponseContext } from "../ContextApi/ContextApi";

function Edit({ Project }) {
  const [show, setShow] = useState(false);
  const [newProject, setNewProject] = useState(Project);
  const [preview, setPreview] = useState("");
  const { setEditResponse } = useContext(editResponseContext);

  useEffect(() => {
    if (newProject.image && typeof newProject.image !== "string") {
      setPreview(URL.createObjectURL(newProject.image));
    } else {
      setPreview(`${base_url}/projectimg/${Project?.image}`);
    }
  }, [newProject.image, Project?.image]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = async () => {
    const { title, description, language, gitRepo, demo, image } = newProject;
    if (!title || !description || !language || !gitRepo || !demo || !image) {
      toast.error("All fields are required");
      return;
    }

    const header = {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };

    const response = await editProjectApi(Project._id, newProject, header);
    if (response.status === 200) {
      toast.success("Project updated successfully");
      setPreview("");
      setEditResponse(response);
      handleClose();
    } else {
      toast.error("Failed to update project");
      console.log(response);
    }
  };

  return (
    <>
      <button className="btn text-light border-0" onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        contentClassName="bg-dark text-white rounded-4 border border-light shadow"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-warning">Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            <div className="col-md-4 text-center">
              <label htmlFor="editImage" className="d-block cursor-pointer">
                <input
                  type="file"
                  id="editImage"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setNewProject({ ...newProject, image: e.target.files[0] })
                  }
                />
                <img
                  src={preview}
                  alt="preview"
                  className="img-fluid rounded shadow"
                  style={{
                    width: "100%",
                    maxHeight: "180px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border: "1px solid #fff",
                  }}
                />
              </label>
            </div>

            <div className="col-md-8">
              <input
                type="text"
                placeholder="Title"
                className="form-control mb-2 bg-dark text-white border-light"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="form-control mb-2 bg-dark text-white border-light"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Language"
                className="form-control mb-2 bg-dark text-white border-light"
                value={newProject.language}
                onChange={(e) =>
                  setNewProject({ ...newProject, language: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="GitHub Repo URL"
                className="form-control mb-2 bg-dark text-white border-light"
                value={newProject.gitRepo}
                onChange={(e) =>
                  setNewProject({ ...newProject, gitRepo: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Demo URL"
                className="form-control bg-dark text-white border-light"
                value={newProject.demo}
                onChange={(e) =>
                  setNewProject({ ...newProject, demo: e.target.value })
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
