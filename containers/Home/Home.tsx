import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import Table from '@/components/Table';
import { fetchChargingLocations } from '@/api';
import AddLocationModal from './AddLocationModal';
import {
  APIPagination,
  APISort,
  ChargingLocation,
  GetLocationsParams,
} from '@/api/types';
import * as S from './styles';

const showError = (msg: string) => toast.error(msg);

export interface HomeProps {
  locations: ChargingLocation[];
  pagination: APIPagination['Response'];
  sort?: APISort;
}

const Home = ({ locations, pagination, sort }: HomeProps) => {
  const router = useRouter();
  const [addLocationModal, setAddLocationModal] = useState(false);
  const [serverParams, setServerParams] = useState<GetLocationsParams>({
    ...sort,
    perPage: pagination.perPage,
    page: pagination.page,
  });

  const { data, isLoading } = useQuery(
    ['locations', serverParams],
    fetchChargingLocations,
    {
      keepPreviousData: true,
      refetchOnMount: false,
      onError: () => {
        showError('Something went wrong!!');
      },
      initialData: { data: locations, sort, pagination },
    },
  );

  useEffect(() => {
    setServerParams({ ...router.query });
  }, [router.query]);

  const handleServerParamsUpdate = async (
    params: APISort | APIPagination['Request'],
  ) => {
    await router.push(
      {
        pathname: '/',
        query: { ...router.query, ...params },
      },
      undefined,
      { shallow: true },
    );
  };

  const navigateToDetails = async ({ id }: ChargingLocation) => {
    await router.push(`/locations/${id}`);
  };

  return (
    <div>
      <S.HomeHeader>
        <Typography variant="h3" as="h2">
          Charging Locations XX
        </Typography>
        <S.AddLocationButtonWrapper>
          <Button
            color="secondary"
            onClick={() => {
              setAddLocationModal(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Location
          </Button>
        </S.AddLocationButtonWrapper>
      </S.HomeHeader>

      <S.TableWrapper>
        <Table
          items={data?.data || []}
          pagination={data?.pagination}
          sort={data?.sort}
          onPagination={handleServerParamsUpdate}
          onSort={handleServerParamsUpdate}
          onRowClick={navigateToDetails}
          loading={isLoading}
          headers={{
            id: { title: 'ID', sortable: false },
            name: { title: 'Name' },
            location: { title: 'Location' },
            chargers: { title: 'Chargers' },
            postalCode: { title: 'Postal code', sortable: false },
            lastUpdated: { title: 'lastUpdated' },
            country: { title: 'country' },
          }}
        />
      </S.TableWrapper>

      <Toaster position="top-right" />
      <AddLocationModal open={addLocationModal} setOpen={setAddLocationModal} />
    </div>
  );
};

export default Home;
