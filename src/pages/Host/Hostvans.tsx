import {
  Await,
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { getHostVans } from "../../api";
import type { Van } from "../../type";
import { Suspense } from "react";
import { requireAuth } from "../../utils";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return { hostVans: getHostVans() };
}

export default function Hostvans() {
  const hostVansPromise = useLoaderData();

  const renderVanElements = (vans: Van[]) => {
    return vans.map((van) => (
      <Link
        to={`/host/vans/${van.id}`}
        key={van.id}
        className="host-van-link-wrapper"
      >
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}</p>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <section>
          <Suspense fallback={<h2>Loading....</h2>}>
            <Await resolve={hostVansPromise.hostVans}>
              {renderVanElements}
            </Await>
          </Suspense>
        </section>
      </div>
    </section>
  );
}
