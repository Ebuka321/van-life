import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Van {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  type: string;
  hostId: string;
}

interface VanDetailResponse {
  vans: Van;
}

export default function VanDetail() {
  const { id } = useParams();
  const [van, setVan] = useState<Van | null>(null);

  useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((res) => res.json())
      .then((data: VanDetailResponse) => setVan(data.vans));
  }, [id]);

  console.log(van);

  return (
    <div className="van-detail-container">
      {van ? (
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
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
