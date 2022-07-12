export interface ChargingLocation {
  id: string | number;
  name?: string;
  location?: number;
  chargers?: Charger[];
  postalCode?: string;
  lastUpdated?: string;
  country?: string;
}

export interface GetLocationsParams {
  by?: string;
  type?: string;
  page?: string;
  perPage?: string;
}

export interface Charger {
  id: string | number;
  type?: 'HPC' | 'T52' | 'T53C';
  serialNumber?: string;
  status?: 'CONNECTED' | 'NOT_CONNECTED' | 'REMOVED';
  lastUpdated?: string;
}

export interface APIPagination {
  Request: {
    page: string;
    perPage: string;
  };
  Response: {
    page: string;
    perPage: string;
    total?: string;
  };
}

export interface APISort {
  by: string;
  type: 'asc' | 'desc';
}

export interface APIResponse<T> {
  data: T;
  pagination?: APIPagination['Response'];
  sort?: APISort;
}
