import { Link, NavLink } from "react-router-dom";
import type { CSSProperties } from "react";
import imageUrl from "../assets/images/avatar-icon.png";

export default function Header() {
  const activeStyle: CSSProperties = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }

  return (
    <header>
      <NavLink to="/">#Vanlife</NavLink>
      <nav>
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Vans
        </NavLink>
        <NavLink
          to="/host"
          end
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Host
        </NavLink>
        <Link to="login" className="login-link">
          <img src={imageUrl} alt="login-icon" />
        </Link>
        <button onClick={fakeLogOut}>X</button>
      </nav>
    </header>
  );
}
