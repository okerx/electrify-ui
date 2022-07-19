import { ReactElement } from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ChargingLocation } from '@/api/types';
import LocationDetails from '@/containers/LocationDetails';
import { fetchChargingLocationDetails, handeServerError } from '@/api';
import { GetServerSideProps } from 'next';

interface LocationDetailsPageProps {
  location: ChargingLocation;
}

const LocationDetailsPage: NextPageWithLayout<LocationDetailsPageProps> = ({
  location,
}) => {
  return (
    <>
      <Head>
        <title>{location.name} | Electrify</title>
      </Head>

      <LocationDetails location={location} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const location = await fetchChargingLocationDetails(params?.id as string);

    return {
      props: { location },
    };
  } catch (e) {
    return handeServerError(e);
  }
};

LocationDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default LocationDetailsPage;
