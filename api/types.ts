import { AxiosError } from 'axios';

export interface ChargingLocation {
  id: string;
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

export type CreateChargerParams = Omit<Charger, 'id' | 'lastUpdated'>;

export interface CreateLocationParams {
  name?: string;
  location?: number;
  postalCode?: string;
  country?: string;
  chargers?: Charger[];
}

export interface Charger {
  id: string;
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
  by?: string;
  type?: 'asc' | 'desc';
}

export interface APIResponse<T> {
  data: T;
  pagination?: APIPagination['Response'];
  sort?: APISort;
}

export type APIError = AxiosError<{
  statusCode: number;
  message: string[];
  error: string;
}>;
