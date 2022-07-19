import { GetServerSidePropsResult } from 'next';
import axios, { AxiosError } from 'axios';
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

export const handleClientError = (e: unknown): void => {
  const error = e as AxiosError<{ message?: string | string[] }>;
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

export const handeServerError = (e: unknown): GetServerSidePropsResult<any> => {
  const error = e as AxiosError<{ message?: string | string[] }>;
  const statusCode = error.response?.status;
  const statusText = error.response?.statusText;
  const message = Array.isArray(error.response?.data.message)
    ? error.response?.data.message[0]
    : error.response?.data.message;

  if (statusCode && statusCode < 500 && message) {
    return {
      props: {
        error: { statusCode, title: `${statusText} - ${message}` },
      },
    };
  }

  throw new Error('Internal Server Error', { cause: error });
};
