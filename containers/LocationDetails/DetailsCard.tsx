import { useTheme } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import { ChargingLocation } from '@/api/types';
import * as S from './styles';

interface DetailsCardProps {
  location: ChargingLocation;
  onEdit: () => void;
}

const DetailsCard = ({ location, onEdit }: DetailsCardProps) => {
  const { palette } = useTheme();

  return (
    <S.StyledDetailsCard>
      <S.CardAction>
        <Button variant="text" color="secondary" onClick={onEdit}>
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </Button>
      </S.CardAction>
      <S.CardStack>
        <div>
          <Typography fontWeight="bold" color={palette.text.secondary}>
            ID
          </Typography>{' '}
          <Typography>{location.id}</Typography>
        </div>
        <div>
          <Typography fontWeight="bold" color={palette.text.secondary}>
            Location
          </Typography>{' '}
          <Typography>{location.location}</Typography>
        </div>
      </S.CardStack>
      <S.CardStack>
        <div>
          <Typography fontWeight="bold" color={palette.text.secondary}>
            Postal Code
          </Typography>{' '}
          <Typography>{location.postalCode}</Typography>
        </div>
        <div>
          <Typography fontWeight="bold" color={palette.text.secondary}>
            Last Updated
          </Typography>{' '}
          <Typography>{location.lastUpdated}</Typography>
        </div>
      </S.CardStack>
      <S.CardStack>
        <div>
          <Typography fontWeight="bold" color={palette.text.secondary}>
            Country
          </Typography>{' '}
          <Typography>{location.country}</Typography>
        </div>
      </S.CardStack>
    </S.StyledDetailsCard>
  );
};

export default DetailsCard;
