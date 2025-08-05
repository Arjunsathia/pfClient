import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(90deg, #1f1c2c, #928dab)", // same as header
        color: "#fff",
      }}
    >
      <div
        className="container p-4 rounded-4"
        style={{
          background: "rgba(255, 255, 255, 0.05)", // glass effect
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="row gy-4">
          {/* About */}
          <div className="col-md-5">
            <h4 className="text-info fw-bold mb-3">
              CodeDock
            </h4>
            <p style={{ textAlign: "justify", lineHeight: "1.7" }}>
              <strong>CodeDock</strong> is your all-in-one hub to showcase,
              manage, and share your amazing projects. Whether you're a
              developer, designer, or student — take control of your work and
              present it with clarity.
            </p>
            <p style={{ textAlign: "justify", lineHeight: "1.7" }}>
              Secure, clean, and flexible — <em>your projects, your platform</em>.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="text-info fw-semibold mb-3">Quick Links</h5>
            <div className="d-flex flex-column gap-2">
              <Link to="/" className="text-decoration-none text-light">
                🏠 Home
              </Link>
              <Link to="/auth" className="text-decoration-none text-light">
                🔐 Login
              </Link>
              <Link to="/dash" className="text-decoration-none text-light">
                📊 Dashboard
              </Link>
            </div>
          </div>

          {/* Feedback */}
          <div className="col-md-4">
            <h5 className="text-info fw-semibold mb-3">💬 Feedback</h5>
            <textarea
              className="form-control bg-light text-dark rounded-3"
              rows="3"
              placeholder="Let us know your thoughts..."
            ></textarea>
            <button
              className="btn mt-3 w-100"
              style={{
                backgroundColor: "#1abc9c", // same teal accent as logout
                color: "#fff",
                fontWeight: 500,
              }}
            >
              Send Feedback
            </button>
          </div>
        </div>

        <hr className="border-secondary mt-5" />
        <p
          className="text-center text-light m-0"
          style={{ fontSize: "0.9rem" }}
        >
          &copy; {new Date().getFullYear()} CodeDock. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
