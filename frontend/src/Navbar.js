import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS file for styling

function Navbar() {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to="/pages/Home">Home</Link>
        </li>
        <li>
          <Link to="/BackendTest">BackendTest</Link>
        </li>
        <li>
          <Link to="/pages/Login">Login</Link>
        </li>
        <li>
          <Link to="/pages/Search">Search</Link>
        </li>
        <li>
          <Link to="/pages/Bookmarks">Bookmarks</Link>
        </li>
        <li>
          <Link to="/pages/Feedback">Feedback</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
