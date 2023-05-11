import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./NavBar.css";

import GlobalUYlogo from "../img/logo_horizontal.svg";
import usersIcon from "../icons/users_icon.svg";
import requestsIcon from "../icons/requests_icon.svg";
import productsIcon from "../icons/products_icon.svg";
import closeIcon from "../icons/close_icon.svg";
import Logout from "./Logout";
import { Icon } from "semantic-ui-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const location = useLocation();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function isActive(pathname) {
    return location.pathname === pathname;
  }

  return (
    <nav className={isMenuOpen ? "vertical-menu open" : "vertical-menu"}>
      <img
        className="navbar-company-logo"
        src={GlobalUYlogo}
        alt="GlobalUY"
        style={{ width: "auto" }}
      />

      <ul className={isMenuOpen ? "menu-items open" : "menu-items"}>
        <div className={`navbar__li-box ${isActive("/users") ? "active" : ""}`}>
          <img className="navbar__img" src={usersIcon} alt="Usuarios" />
          <li className={"navbar__li"}>
            <Link to="/users">Usuarios</Link>
          </li>
        </div>
        <div
          className={`navbar__li-box ${isActive("/requests") ? "active" : ""}`}
        >
          <img className="navbar__img" src={requestsIcon} alt="Pedidos" />
          <li className={"navbar__li"}>
            <Link to="/requests">Pedidos</Link>
          </li>
        </div>
        <div
          className={`navbar__li-box ${isActive("/products") ? "active" : ""}`}
        >
          <img className="navbar__img" src={productsIcon} alt="Productos" />
          <li className={"navbar__li"}>
            <Link to="/products">Productos</Link>
          </li>
        </div>
        <div className="navbar__li-box">
          <li className={"navbar__li"}>
            <Icon className={"logout-link"} name="log out" />
            <Logout />
          </li>
        </div>
      </ul>
      <div className="menu-toggle" onClick={toggleMenu}>
        <img src={closeIcon} alt="Cerrar" />
        {isMenuOpen && "Cerrar"}
      </div>
    </nav>
  );
};

export default NavBar;
