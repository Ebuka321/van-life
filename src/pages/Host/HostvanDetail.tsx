import { useEffect, useState } from "react";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Van, HostvanDetail } from "../../type";

export default function HostvanDetail() {
  const { id } = useParams();
  const [currentVan, setCurrentVan] = useState<Van>();
  const activeStyles: CSSProperties = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data: HostvanDetail) => setCurrentVan(data.vans));
  }, []);

  console.log(currentVan);

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      {currentVan ? (
        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={currentVan.imageUrl} alt={currentVan.name} />

            <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${currentVan.type}`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}/day</h4>
            </div>
          </div>

          <nav className="host-van-detail-nav">
            <NavLink
              to="."
              end
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Details
            </NavLink>

            <NavLink
              to="pricing"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Pricing
            </NavLink>

            <NavLink
              to="photos"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Photos
            </NavLink>
          </nav>

          <Outlet context={{ currentVan }} />
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </section>
  );
}
