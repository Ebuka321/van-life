import {
  Link,
  useLocation,
  useLoaderData,
  Await,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { getVan } from "../api";
import { Suspense } from "react";
import type { Van } from "../type";

export async function loader({ params }: LoaderFunctionArgs) {
  // return { vanDetail: getVanDetail(params.id) };
  // Validate the route param
  if (!params.id) {
    throw new Error("Van ID is missing in params");
  }

  // Await the API call to get the Van object
  const vanDetail = await getVan(params.id);

  return { vanDetail };
}

export default function VanDetail() {
  const location = useLocation();
  const vanDetailPromise = useLoaderData();

  const search = location.state?.search || "";
  const type = location.state.type || "all";

  const renderVanElements = (van: Van) => {
    return (
      <div className="van-detail">
        <img alt={van.name} src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    );
  };

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>{`Back to ${type} vans`}</span>
      </Link>
      <Suspense fallback={<h2>Loading.....</h2>}>
        <Await resolve={vanDetailPromise.vanDetail}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
}
