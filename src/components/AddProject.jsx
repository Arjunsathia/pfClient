import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { AddProjectApi } from "../Services/AllApi";
import { addResponseContext } from "../ContextApi/ContextApi";

function AddProject() {
  const [show, setShow] = useState(false);
  const [project, setProject] = useState({
    title: "",
    description: "",
    language: "",
    gitRepo: "",
    demo: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (project.image) {
      setPreview(URL.createObjectURL(project.image));
    } else {
      setPreview("");
    }
  }, [project.image]);

  const {setAddResponse} = useContext(addResponseContext);

  const handleSubmit = async () => {
    console.log(project);
    const { title, description, language, gitRepo, demo, image } = project;
    if (!title || !description || !language || !gitRepo || !demo || !image) {
      toast.warning("Please fill all fields");
    } else {
      const response = await AddProjectApi(project);
      console.log(response);
      if (response.status === 200) {
        toast.success("Project Added Successfully");
        setProject({
          title: "",
          description: "",
          language: "",
          gitRepo: "",
          demo: "",
        });
        setPreview("");
        setAddResponse(response)
        handleClose();
      } else {
        toast.error("Project added failed");
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-success" onClick={handleShow}>
        Add to List
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Projects Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <label htmlFor="ff">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="ff"
                  onChange={(e) => {
                    setProject({ ...project, image: e.target.files[0] });
                  }}
                />
                <img
                  src={
                    preview
                      ? preview
                      : "https://static.thenounproject.com/png/187803-200.png"
                  }
                  alt=""
                  className="img-fluid"
                />
              </label>
            </div>
            <div className="col">
              <input
                onChange={(e) => {
                  setProject({ ...project, title: e.target.value });
                }}
                type="text"
                placeholder="Enter Title"
                className="form-control mb-3 "
                name=""
                id=""
              />
              <input
                onChange={(e) => {
                  setProject({ ...project, description: e.target.value });
                }}
                type="text"
                placeholder="Enter description"
                className="form-control mb-3"
                name=""
                id=""
              />
              <input
                onChange={(e) => {
                  setProject({ ...project, language: e.target.value });
                }}
                type="text"
                placeholder="Enter language"
                className="form-control mb-3"
                name=""
                id=""
              />
              <input
                onChange={(e) => {
                  setProject({ ...project, gitRepo: e.target.value });
                }}
                type="text"
                placeholder="Enter Git Repo URl"
                className="form-control mb-3"
                name=""
                id=""
              />
              <input
                onChange={(e) => {
                  setProject({ ...project, demo: e.target.value });
                }}
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
          <Button onClick={handleSubmit} variant="primary">
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProject;
