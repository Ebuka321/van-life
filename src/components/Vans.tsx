import { Link, useLoaderData, useSearchParams, Await } from "react-router-dom";
import type { Van } from "../type";
import { getVans } from "../api";
import { Suspense } from "react";

export function loader() {
  return { vans: getVans() };
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();

  const promiseData = useLoaderData();

  const typeFilter: string | null = searchParams.get("type");

  function handlleFilterChange(key: string, value: string | null) {
    setSearchParams((prevSearchParams) => {
      if (value === null) {
        prevSearchParams.delete(key);
      } else {
        prevSearchParams.set(key, value);
      }

      return prevSearchParams;
    });
  }

  function renderVanElements(vans: Van[]) {
    const displayedVans = typeFilter
      ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
      : vans;

    const vanElements = displayedVans.map((van) => {
      return (
        <div key={van.id} className="van-tile">
          <Link
            to={van.id}
            state={{
              search: `?${searchParams.toString()}`,
              type: typeFilter,
            }}
          >
            <img src={van.imageUrl} />
            <div className="van-info">
              <h3>{van.name}</h3>
              <p>
                ${van.price}
                <span>/day</span>
              </p>
            </div>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
          </Link>
        </div>
      );
    });

    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            onClick={() => handlleFilterChange("type", "simple")}
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : ""
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => handlleFilterChange("type", "luxury")}
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : ""
            }`}
          >
            Luxury
          </button>
          <button
            onClick={() => handlleFilterChange("type", "rugged")}
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : ""
            }`}
          >
            Rugged
          </button>
          {typeFilter ? (
            <button
              onClick={() => handlleFilterChange("type", null)}
              className="van-list-filter-buttons"
            >
              Clear Flitter
            </button>
          ) : null}
        </div>
        <div className="van-list">{vanElements}</div>
      </>
    );
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h2>Loading vans......</h2>}>
        <Await resolve={promiseData.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
}
