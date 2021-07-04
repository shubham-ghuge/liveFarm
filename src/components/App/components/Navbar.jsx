import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/main-logo.svg";
import { FiPlayCircle, FiUser } from "react-icons/fi";

export function Navbar() {
  return (
    <>
      <header>
        <NavLink to="/" className="d-flex ai-center">
          <img src={logo} className="img-logo" alt="lifeFarm Logo" />
        </NavLink>
        <ul>
          <li>
            <NavLink
              to="/playlist"
              className="link-reset"
              activeClassName="active"
            >
              <span className="avatar-sm-i-basic">
                <FiPlayCircle className="icon" />
              </span>
              <span className="text">Playlists</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account"
              className="link-reset"
              activeClassName="active"
            >
              <span className="avatar-sm-i-basic">
                <FiUser className="icon" />
              </span>
              <span className="text">account</span>
            </NavLink>
          </li>
        </ul>
      </header>
    </>
  );
}
