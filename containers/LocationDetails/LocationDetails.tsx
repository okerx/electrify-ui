import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faBolt } from '@fortawesome/free-solid-svg-icons/faBolt';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import Table from '@/components/Table';
import IconButton from '@/components/IconButton';
import { Charger, ChargingLocation } from '@/api/types';
import DetailsCard from './DetailsCard';
import * as S from './styles';
import DetailsCardEdit from './DetailsCardEdit';
import AddOrEditChargerModal from './AddOrEditChargerModal';

interface LocationDetails {
  location: ChargingLocation;
}

export const LocationDetails = ({ location }: LocationDetails) => {
  const { palette } = useTheme();
  const [editLocation, setEditLocation] = useState(false);
  const [addChargerModal, setAddChargerModal] = useState(false);
  const [chargerToEdit, setChargerToEdit] = useState<Charger | null>(null);

  const handleEditOpen = () => {
    setEditLocation(true);
  };
  const handleEditClose = () => {
    setEditLocation(false);
  };

  const renderTable = () => {
    if (!location.chargers || location.chargers.length === 0)
      return (
        <S.NoDataWrapper>
          <Typography color={palette.text.secondary} fontWeight="bold">
            No items
          </Typography>
        </S.NoDataWrapper>
      );

    return (
      <Table
        items={location.chargers || []}
        customRenderers={{
          actions: charger => {
            return (
              <S.TableActions>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    setChargerToEdit(charger);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    if (
                      window.confirm('Are you sure you wanna delete charger?')
                    ) {
                      console.log('deleted');
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </IconButton>
              </S.TableActions>
            );
          },
        }}
        headers={{
          id: { title: 'ID', sortable: false },
          type: { title: 'Type', sortable: false },
          status: { title: 'Status', sortable: false },
          serialNumber: { title: 'Serial Number', sortable: false },
          lastUpdated: { title: 'Last Updated', sortable: false },
          actions: { title: 'Actions', sortable: false },
        }}
      />
    );
  };

  return (
    <div>
      <Typography variant="h3" as="h2">
        <FontAwesomeIcon icon={faLocationDot} /> {location.name}
      </Typography>
      {editLocation ? (
        <DetailsCardEdit location={location} onCancel={handleEditClose} />
      ) : (
        <DetailsCard location={location} onEdit={handleEditOpen} />
      )}

      <S.ChargersHeader>
        <Typography variant="h5" as="h3">
          <FontAwesomeIcon icon={faBolt} /> Chargers
        </Typography>
        <S.AddChargerButtonWrapper>
          <Button
            color="secondary"
            onClick={() => {
              setAddChargerModal(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Charger
          </Button>
        </S.AddChargerButtonWrapper>
      </S.ChargersHeader>

      {renderTable()}

      <AddOrEditChargerModal
        title="Add New Charger"
        open={addChargerModal}
        setOpen={setAddChargerModal}
      />
      <AddOrEditChargerModal
        title="Edit Charger"
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
