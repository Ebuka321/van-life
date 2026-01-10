export interface Van {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  type: string;
  hostId: string;
}

export interface HostvanDetail {
  vans: Van;
}

export interface VanDetailResponse {
  vans: Van;
}

export interface HostVansResponse {
  vans: Van[];
}

export interface VanResponse {
  vans: Van[];
}

export interface OutletContext {
  currentVan: Van;
}
