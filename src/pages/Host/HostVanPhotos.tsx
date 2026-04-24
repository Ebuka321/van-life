import { useOutletContext } from "react-router-dom";
import type { Van } from "../../type";

type HostOutletContext = { currentVan: Van };
export default function HostVanPhotos() {
  const { currentVan } = useOutletContext<HostOutletContext>();
  return <img src={currentVan.imageUrl} className="host-van-detail-image" />;
}
