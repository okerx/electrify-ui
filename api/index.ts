import axios from 'axios';
import {
  APIResponse,
  Charger,
  ChargingLocation,
  CreateChargerParams,
  CreateLocationParams,
  GetLocationsParams,
} from '@/api/types';
import { QueryFunction } from 'react-query';
import { Config } from '@/constants';
import { toaster } from '@/utils';

const axiosClient = axios.create({
  baseURL: Config.API_URL,
});

export const fetchChargingLocations = async (params: GetLocationsParams) => {
  const { data } = await axiosClient.get<APIResponse<ChargingLocation[]>>(
    '/locations',
    { params },
  );

  return data;
};

export const chargingLocationsQuery: QueryFunction<
  APIResponse<ChargingLocation[]>,
  [string, GetLocationsParams]
> = async ({ queryKey }): Promise<APIResponse<ChargingLocation[]>> => {
  const [_, params] = queryKey;

  return await fetchChargingLocations(params);
};

export const createLocation = async (
  params: CreateLocationParams,
): Promise<ChargingLocation> => {
  const { data } = await axiosClient.post<ChargingLocation>(
    '/locations',
    params,
  );

  return data;
};

export const fetchChargingLocationDetails = async (
  id: string,
): Promise<ChargingLocation> => {
  const { data } = await axiosClient.get<ChargingLocation>(`/locations/${id}`);

  return data;
};

export const chargingLocationDetailsQuery: QueryFunction<
  ChargingLocation,
  [string, string]
> = async ({ queryKey }): Promise<ChargingLocation> => {
  const [_, id] = queryKey;

  return await fetchChargingLocationDetails(id);
};

export const updateChargingLocation = async (
  id: string,
  params: Omit<CreateLocationParams, 'chargers'>,
): Promise<ChargingLocation> => {
  const { data } = await axiosClient.put<ChargingLocation>(
    `/locations/${id}`,
    params,
  );

  return data;
};

export const createCharger = async (
  locationId: string,
  params: CreateChargerParams,
): Promise<Charger> => {
  const { data } = await axiosClient.post<Charger>(
    `/chargers/${locationId}`,
    params,
  );

  return data;
};

export const updateCharger = async (
  id: string,
  params: CreateChargerParams,
): Promise<Charger> => {
  const { data } = await axiosClient.put<Charger>(`/chargers/${id}`, params);

  return data;
};

export const deleteCharger = async (locationId: string, chargerId: string) => {
  await axiosClient.delete(`/chargers/${locationId}/${chargerId}`);
};

export const handleError = (error: any): void => {
  const message = error?.response?.data?.message;
  if (Array.isArray(message)) {
    message.forEach(msg => {
      toaster.error(msg);
    });
  } else if (typeof message === 'string') {
    toaster.error(message);
  } else {
    toaster.error('Something went wrong!');
  }
};
