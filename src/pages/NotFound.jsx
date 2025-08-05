import React from "react";

function NotFound() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        color: "#ffffff",
      }}
    >
      <div
        className="p-5 text-center rounded-4"
        style={{
          width: "60%",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h1 className="text-danger display-4 fw-bold">404</h1>
        <p className="fs-3 fw-semibold text-white mt-3">Oops! Page Not Found</p>
        <p className="text-white-50 fs-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="btn btn-outline-light mt-4 px-4 py-2 rounded-pill"
          style={{ fontWeight: 500 }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
