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
    const data = dataList.filter((item) =>
      item.language?.toLowerCase().includes(val.toLowerCase())
    );
    setProjectList(data);
  };

  const getData = async () => {
    const response = await allProjecsApi();
    console.log(response)
    if (response.status === 200) {
      setProjectList(response.data);
      setDataList(response.data);
    }
  };
  return (
    <>
      <Header />
      <div className="container-fluid" style={{ minHeight: "70vh" }}>
        <div className="d-flex justify-content-between my-5">
          <h1>All Projects</h1>
          <input
            type="search"
            placeholder="Search with Language"
            className="form-control w-25"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-wrap justify-content-around">
          {projectList.length > 0 ? (
            projectList.map((item) => <Projectcard project={item} />)
          ) : (
            <h4>No Projects Available!!</h4>
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;
