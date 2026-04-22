import { useOutletContext } from "react-router-dom";
import type { Van } from "../../type";

type HostOutletContext = { currentVan: Van };
export default function HostVanPricing() {
  const { currentVan } = useOutletContext<HostOutletContext>();
  return (
    <h3 className="host-van-price">
      ${currentVan.price}
      <span>/day</span>
    </h3>
  );
}
