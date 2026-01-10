import { useOutletContext } from "react-router-dom";
import type { OutletContext } from "../../type";

export default function HostVanPricing() {
  const { currentVan } = useOutletContext<OutletContext>();
  return (
    <h3 className="host-van-price">
      ${currentVan.price}
      <span>/day</span>
    </h3>
  );
}
