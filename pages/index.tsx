import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import Head from 'next/head';
import DashboardLayout from '@/layouts/DashboardLayout';
import { NextPageWithLayout } from '@/pages/_app';
import Home from '@/containers/Home';
import {
  APIPagination,
  APISort,
  ChargingLocation,
  GetLocationsParams,
} from '@/api/types';
import { fetchChargingLocations, handeServerError } from '@/api';
import { AxiosError } from 'axios';

interface IndexPageProps {
  locations: ChargingLocation[];
  pagination: APIPagination['Response'];
  sort?: APISort;
}

const IndexPage: NextPageWithLayout<IndexPageProps> = ({
  locations,
  sort,
  pagination,
}) => {
  return (
    <>
      <Head>
        <title>Charging Locations | Electrify</title>
      </Head>

      <Home pagination={pagination} sort={sort} locations={locations} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { by, type, page, perPage } = query as GetLocationsParams;

  if (!page || !perPage) {
    return {
      redirect: {
        destination: `/?page=${1}&perPage=${10}`,
        permanent: false,
      },
    };
  }

  const _sort = !!by && !!type ? { by, type } : {};
  const _pagination = !!page && !!perPage ? { page, perPage } : {};

  try {
    const { data, sort, pagination } = await fetchChargingLocations({
      ..._sort,
      ..._pagination,
    });

    return {
      props: { locations: data, pagination, sort },
    };
  } catch (e) {
    return handeServerError(e);
  }
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default IndexPage;
