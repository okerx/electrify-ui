import { ReactElement } from 'react';
import Head from 'next/head';
import DashboardLayout from '@/layouts/DashboardLayout';
import { NextPageWithLayout } from '@/pages/_app';
import Home from '@/containers/Home';
import { useTheme } from '@emotion/react';
import { APIPagination, APISort, ChargingLocation } from '@/api/types';

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
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Electrify - Charging Locations</title>
      </Head>

      <Home pagination={pagination} sort={sort} locations={locations} />
    </>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      locations,
      pagination: {
        page: 1,
        perPage: 10,
        total: 45,
      },
      sort: null,
    },
  };
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

const locations: ChargingLocation[] = [
  {
    id: 665,
    name: 'Lillian',
    location: 727905,
    chargers: [],
    postalCode: '601 81',
    country: 'SE',
    lastUpdated: '11/19/2021',
  },
  {
    id: 520,
    name: 'Fuller',
    location: 425925,
    chargers: [],
    postalCode: '123DD',
    country: 'CN',
    lastUpdated: '2/15/2022',
  },
  {
    id: 289,
    name: 'Sheridan',
    location: 350059,
    chargers: [],
    postalCode: '123H',
    country: 'JO',
    lastUpdated: '11/28/2021',
  },
  {
    id: 107,
    name: 'Lighthouse Bay',
    location: 802073,
    chargers: [],
    postalCode: '37665',
    country: 'US',
    lastUpdated: '12/6/2021',
  },
  {
    id: 72,
    name: 'Mallory',
    location: 358213,
    chargers: [],
    postalCode: '70183',
    country: 'US',
    lastUpdated: '8/14/2021',
  },
  {
    id: 729,
    name: 'Veith',
    location: 746665,
    chargers: [],
    postalCode: '4750-549',
    country: 'PT',
    lastUpdated: '5/7/2022',
  },
  {
    id: 74,
    name: 'North',
    location: 428616,
    chargers: [],
    postalCode: '26950-000',
    country: 'BR',
    lastUpdated: '1/24/2022',
  },
];

export default IndexPage;
