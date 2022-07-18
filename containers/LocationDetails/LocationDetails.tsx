import { useState } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons/faBolt';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { chargingLocationDetailsQuery, handleClientError } from '@/api';
import { Charger, ChargingLocation } from '@/api/types';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import DetailsCard from './DetailsCard';
import DetailsCardEdit from './DetailsCardEdit';
import AddOrEditChargerModal from './AddOrEditChargerModal';
import * as S from './styles';

import ChargersTable from './ChargersTable';

interface LocationDetailsProps {
  location: ChargingLocation;
}

export const LocationDetails = ({ location }: LocationDetailsProps) => {
  const [editLocation, setEditLocation] = useState(false);
  const [addChargerModal, setAddChargerModal] = useState(false);
  const [chargerToEdit, setChargerToEdit] = useState<Charger | null>(null);

  const { data } = useQuery(
    ['locationDetails', location.id],
    chargingLocationDetailsQuery,
    {
      keepPreviousData: true,
      refetchOnMount: false,
      onError: handleClientError,
      initialData: location,
    },
  );

  const handleEditOpen = () => {
    setEditLocation(true);
  };
  const handleEditClose = () => {
    setEditLocation(false);
  };

  return (
    <div>
      {editLocation ? (
        <DetailsCardEdit location={data} onCancel={handleEditClose} />
      ) : (
        <DetailsCard location={data} onEdit={handleEditOpen} />
      )}

      <S.ChargersHeader>
        <Typography variant="h5" as="h3">
          <FontAwesomeIcon icon={faBolt} /> Chargers
        </Typography>
        <S.AddChargerButtonWrapper>
          <Button
            color="secondary"
            data-test-id="add-charger-btn"
            onClick={() => {
              setAddChargerModal(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Charger
          </Button>
        </S.AddChargerButtonWrapper>
      </S.ChargersHeader>

      <ChargersTable
        chargingLocation={data}
        setChargerToEdit={setChargerToEdit}
      />

      <AddOrEditChargerModal
        title="Add New Charger"
        locationId={data?.id}
        open={addChargerModal}
        setOpen={setAddChargerModal}
      />
      <AddOrEditChargerModal
        title="Edit Charger"
        editModel
        open={!!chargerToEdit}
        chargerToEdit={chargerToEdit}
        setOpen={() => {
          setChargerToEdit(null);
        }}
      />
    </div>
  );
};

export default LocationDetails;
