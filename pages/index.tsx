import type { NextPage } from 'next';
import Head from 'next/head';
import Table from '@/components/Table';
import { TablePagination, TableSort } from '@/components/Table/types';
import Select from '@/components/Select';
import TextField from '@/components/TextField';
import Modal from '@/components/Modal';
import { useState } from 'react';
import Button from '@/components/Button';

interface ChargingLocation {
  id: PrimitiveType;
  name?: string;
  location?: number;
  chargers?: number;
  postalCode?: number | string | null;
  lastUpdated?: string;
  country?: string;
}

const Home: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const onTablePagination = (p: TablePagination) => {
    console.log('table pagination', p);
  };

  const onTableSort = (s: TableSort) => {
    console.log('table sort', s);
  };

  const onTableRowClick = (it: ChargingLocation) => {
    console.log('table row click', it);
  };

  return (
    <>
      <Head>
        <title>Charging Locations</title>
        <meta name="description" content="Find charging locations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Table
          loading
          pagination={{
            page: 3,
            perPage: 15,
            total: 44,
          }}
          sort={{
            by: 'name',
            type: 'asc',
          }}
          items={locations}
          headers={{
            id: { title: 'ID' },
            name: { title: 'Name' },
            chargers: { title: 'Chargers' },
            location: { title: 'Location' },
            postalCode: { title: 'Postal Code' },
            country: { title: 'Country', sortable: false },
            lastUpdated: { title: 'Last Updated' },
          }}
          onPagination={onTablePagination}
          onSort={onTableSort}
          onRowClick={onTableRowClick}
        />
        <div>
          <div>
            <Modal
              open={modalOpen}
              setOpen={o => {
                setModalOpen(o);
              }}
              title="Modal Title"
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusantium, fugiat, quo! Beatae delectus dicta ducimus ea id
                laborum, libero magnam neque nulla, quas sed ullam vel! Amet
                dolore illum optio?
              </p>
            </Modal>
          </div>
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Open Modal
          </Button>
          <TextField disabled label="Text" helperText="xxx" />
          <Select
            hideDetails
            options={[
              {
                value: 'option 1',
                title: 'Option One',
              },
              {
                value: 'option 2',
                title: 'Option Two',
              },
              {
                value: 'option 3',
                title: 'Option Three',
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

const locations: ChargingLocation[] = [
  {
    id: 665,
    name: 'Lillian',
    location: 727905,
    chargers: 34,
    postalCode: '601 81',
    country: 'SE',
    lastUpdated: '11/19/2021',
  },
  {
    id: 520,
    name: 'Fuller',
    location: 425925,
    chargers: 2,
    postalCode: null,
    country: 'CN',
    lastUpdated: '2/15/2022',
  },
  {
    id: 289,
    name: 'Sheridan',
    location: 350059,
    chargers: 4,
    postalCode: null,
    country: 'JO',
    lastUpdated: '11/28/2021',
  },
  {
    id: 107,
    name: 'Lighthouse Bay',
    location: 802073,
    chargers: 18,
    postalCode: '37665',
    country: 'US',
    lastUpdated: '12/6/2021',
  },
  {
    id: 72,
    name: 'Mallory',
    location: 358213,
    chargers: 24,
    postalCode: '70183',
    country: 'US',
    lastUpdated: '8/14/2021',
  },
  {
    id: 729,
    name: 'Veith',
    location: 746665,
    chargers: 13,
    postalCode: '4750-549',
    country: 'PT',
    lastUpdated: '5/7/2022',
  },
  {
    id: 74,
    name: 'North',
    location: 428616,
    chargers: 14,
    postalCode: '26950-000',
    country: 'BR',
    lastUpdated: '1/24/2022',
  },
];

export default Home;
