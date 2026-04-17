import {
  Await,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { Suspense, type CSSProperties } from "react";
import type { HostVanLoaderData, Van } from "../../type";
import { getVan } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<HostVanLoaderData> {
  // Make sure user is authenticated
  await requireAuth(request);

  // Validate the route param
  if (!params.id) {
    throw new Error("Van ID is missing in params");
  }

  // Await the API call to get the Van object
  const hostVan = await getVan(params.id);

  return { hostVan };
}

export default function HostvanDetail() {
  const hostVanDetailPromise = useLoaderData();
  const activeStyles: CSSProperties = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const renderVanElements = (currentVan: Van) => {
    return (
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
    );
  };

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <Suspense fallback={<h2>Loading....</h2>}>
        <Await resolve={hostVanDetailPromise.hostVan}>
          {renderVanElements}
        </Await>
      </Suspense>
    </section>
  );
}
