import { ReactElement } from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ChargingLocation } from '@/api/types';
import LocationDetails from '@/containers/LocationDetails';

interface LocationDetailsPageProps {
  location: ChargingLocation;
}

const LocationDetailsPage: NextPageWithLayout<LocationDetailsPageProps> = ({
  location,
}) => {
  return (
    <>
      <Head>
        <title>Electrify - Charging Locations</title>
      </Head>

      <LocationDetails location={location} />
    </>
  );
};

export const getServerSideProps = () => {
  return {
    props: { location },
  };
};

const location = {
  id: '1231asd',
  name: 'Fuller',
  location: 2131,
  postalCode: '12D 324C',
  lastUpdated: '10/10/2020',
  country: 'NL',
  chargers: [
    {
      id: 12,
      type: 'HPC',
      serialNumber: 'aaa',
      status: 'CONNECTED',
      lastUpdated: '10/10/2020',
    },
    {
      id: 234,
      type: 'T52',
      serialNumber: 'bbb',
      status: 'NOT_CONNECTED',
      lastUpdated: '10/10/2020',
    },
    {
      id: 214,
      type: 'T53C',
      serialNumber: 'ccc',
      status: 'REMOVED',
      lastUpdated: '10/10/2020',
    },
  ],
};

LocationDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default LocationDetailsPage;
