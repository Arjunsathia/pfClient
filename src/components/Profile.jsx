import React, { useState } from "react";

function Profile() {
  const [profileShow, setProfileShow] = useState(false);
  const togglerProfile = () => {
    setProfileShow(!profileShow);
  };
  return (
    <>
      <div className="container-fluid border border-2 border-info p-3">
        <div className="d-flex justify-content-between">
          <h3>Profile</h3>
          <button className="btn border-0" onClick={togglerProfile}>
            {profileShow ? (
              <i class="fa-solid fa-toggle-on fa-xl "></i>
            ) : (
              <i class="fa-solid fa-toggle-off fa-xl "></i>
            )}
          </button>
        </div>
        {profileShow && (
          <div className="w-100">
            <div>
              <label htmlFor="pf" className="d-flex justify-content-between">
                <input
                  type="file"
                  name=""
                  id="pf"
                  style={{ display: "none" }}
                />
                <img
                  src="https://www.iconpacks.net/icons/1/free-user-icon-972-thumb.png"
                  alt=""
                  className="img-fluid"
                />
              </label>
              <input
                type="text"
                placeholder="Username"
                className="my-3 form-control"
              />
              <input type="text" placeholder="Git Link" className="my-3 form-control" />
              <input
                type="text"
                placeholder="LinkdIn"
                className="my-3 form-control"
              />
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-success">Update</button>
                <button className="btn btn-danger">cancel / close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
