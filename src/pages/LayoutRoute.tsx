import Header from "../components/Header";
import Footer from "../components/Footer";
import { useOutlet } from "react-router-dom";
export default function LayoutRoute() {
  const outlet = useOutlet();
  return (
    <>
      <Header />
      <main>{outlet}</main>
      <Footer />
    </>
  );
}
