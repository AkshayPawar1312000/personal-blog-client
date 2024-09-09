import React from "react";
import "./navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/");
  };
  const handleDashboardButton = () => {
    navigate("/dashboard");
  };
  const handleAddNewUserButton = () => {
    navigate("/userRegistration");
  };
  const handleLoginButton = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item">
          <Button
            style={{ color: "white", textTransform: "none" }}
            onClick={handleHomeButton}
          >
            Home
          </Button>
        </li>
        <li className="nav-item">
          <Button
            style={{ color: "white", textTransform: "none" }}
            onClick={handleDashboardButton}
          >
            Dashboard
          </Button>
        </li>
        <li className="nav-item">
          <Button
            style={{ color: "white", textTransform: "none" }}
            onClick={handleAddNewUserButton}
          >
            Add New User
          </Button>
        </li>
      </ul>
      <Button
        size="small"
        variant="contained"
        endIcon={<LogoutIcon />}
        onClick={handleLoginButton}
        sx={{
          backgroundColor: "#37B7C3",
          "&:hover": {
            backgroundColor: "#088395",
          },
        }}
      />
    </nav>
  );
}

export default Navbar;
