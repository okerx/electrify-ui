import axios from 'axios';
import { APIResponse, ChargingLocation, GetLocationsParams } from '@/api/types';
import { QueryFunction } from 'react-query';

const axiosClient = axios.create({
  baseURL: '',
});

export const fetchChargingLocations: QueryFunction<
  APIResponse<ChargingLocation[]>
> = async ({ queryKey }) => {
  const [_, params] = queryKey;

  const { data } = await axiosClient.get<APIResponse<ChargingLocation[]>>(
    '/locations',
    { params },
  );

  return data;
};
