import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "rgb(187, 46, 31)",
};

export default class NavBar extends Component {
  render() {
    return (
      <nav className="row space-between">
        <ul className="row nav">
          <li>
            <NavLink
              to="/"
              exact
              className="nav-link"
              activeStyle={activeStyle}
            >
              Top
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              exact
              className="nav-link"
              activeStyle={activeStyle}
            >
              New
            </NavLink>
          </li>
        </ul>
        <button
          style={{ fontSize: 30 }}
          className="btn-clear"
          // onClick={toggleTheme}
        >
          {/* {theme === "light" ? "🔦" : "💡"} */}
          🔦
        </button>
      </nav>
    );
  }
}
