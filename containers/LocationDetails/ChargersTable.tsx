import { useTheme } from '@emotion/react';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { $dayjs, toaster } from '@/utils';
import { Charger, ChargingLocation } from '@/api/types';
import { deleteCharger, handleError } from '@/api';
import { useConfirm } from '@/providers/ConfirmProvider';
import Typography from '@/components/Typography';
import Table from '@/components/Table';
import IconButton from '@/components/IconButton';
import Badge from '@/components/Badge';
import * as S from './styles';
import { StatusVariants } from './constants';

interface ChargersTableProps {
  chargingLocation?: ChargingLocation;
  setChargerToEdit: (c: Charger) => void;
}

const ChargersTable = ({
  chargingLocation,
  setChargerToEdit,
}: ChargersTableProps) => {
  const router = useRouter();
  const { palette } = useTheme();
  const queryClient = useQueryClient();
  const { isConfirmed } = useConfirm();

  const mutation = useMutation(
    (id: string) => deleteCharger(chargingLocation?.id as string, id),
    {
      onSuccess: async (_, chargerId) => {
        toaster.success('Charger was deleted successfully');
        await queryClient.setQueryData<ChargingLocation>(
          ['locationDetails', router.query.id],
          data => {
            return {
              id: data?.id as string,
              ...data,
              chargers: data?.chargers?.filter(ch => ch.id !== chargerId),
            };
          },
        );
      },
      onError: handleError,
    },
  );

  if (!chargingLocation?.chargers || chargingLocation.chargers.length === 0)
    return (
      <S.NoDataWrapper>
        <Typography color={palette.text.secondary} fontWeight="bold">
          No items
        </Typography>
      </S.NoDataWrapper>
    );

  return (
    <Table
      items={chargingLocation?.chargers || []}
      customRenderers={{
        lastUpdated: ({ lastUpdated }) => $dayjs(lastUpdated).fromNow(),
        status: ({ status }) => {
          if (status) {
            const { color, text } = StatusVariants[status] || {};
            return <Badge color={color}>{text || status}</Badge>;
          }
          return '';
        },
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
                onClick={async () => {
                  const confirmed = await isConfirmed(
                    'Are you sure you wanna delete charger?',
                  );
                  if (confirmed) {
                    mutation.mutate(charger.id);
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

export default ChargersTable;
