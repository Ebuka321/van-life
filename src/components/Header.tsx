import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">#Vanlife</Link>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}
