import { Link } from "react-router-dom";

export default function Header() {
  console.log("hello");
  return (
    <header>
      <Link to="/">#Vanlife</Link>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}
