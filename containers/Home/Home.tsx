import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import Table from '@/components/Table';
import { chargingLocationsQuery, handleClientError } from '@/api';
import { $dayjs } from '@/utils';
import {
  APIPagination,
  APISort,
  ChargingLocation,
  GetLocationsParams,
} from '@/api/types';
import AddLocationModal from './AddLocationModal';
import * as S from './styles';

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

  const { data, isLoading, isFetching } = useQuery(
    ['locations', serverParams],
    chargingLocationsQuery,
    {
      keepPreviousData: true,
      refetchOnMount: false,
      onError: handleClientError,
      initialData: { data: locations, sort, pagination },
    },
  );

  const handleSort = async ({ by, type }: APISort) => {
    setServerParams({ ...router.query, by, type });
    await router.push(
      {
        pathname: '/',
        query: { ...router.query, by, type },
      },
      undefined,
      { shallow: true },
    );
  };

  const handlePagination = async (params: APIPagination['Request']) => {
    setServerParams({ ...router.query, ...params });
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
          Charging Locations
        </Typography>
        <S.AddLocationButtonWrapper>
          <Button
            color="secondary"
            data-test-id="add-location-modal-btn"
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
          onPagination={handlePagination}
          onSort={handleSort}
          onRowClick={navigateToDetails}
          loading={isLoading || isFetching}
          data-test-id="locations-table"
          headers={{
            id: { title: 'ID', sortable: false },
            name: { title: 'Name' },
            location: { title: 'Location' },
            chargers: { title: 'Chargers' },
            postalCode: { title: 'Postal code', sortable: false },
            lastUpdated: { title: 'lastUpdated' },
            country: { title: 'country' },
          }}
          customRenderers={{
            chargers: ({ chargers = [] }) => chargers.length,
            lastUpdated: ({ lastUpdated }) =>
              lastUpdated && $dayjs(lastUpdated).fromNow(),
          }}
        />
      </S.TableWrapper>

      <AddLocationModal open={addLocationModal} setOpen={setAddLocationModal} />
    </div>
  );
};

export default Home;
