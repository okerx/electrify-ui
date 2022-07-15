import { useTheme } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import { ChargingLocation } from '@/api/types';
import * as S from './styles';
import { $dayjs } from '@/utils';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';

interface DetailsCardProps {
  location?: ChargingLocation;
  onEdit: () => void;
}

const DetailsCard = ({ location, onEdit }: DetailsCardProps) => {
  const { palette } = useTheme();

  return (
    <S.StyledDetailsCard>
      <S.CardHeader>
        <Typography variant="h3" as="h2">
          <FontAwesomeIcon icon={faLocationDot} />{' '}
          <span data-test-id="location-details-name">{location?.name}</span>
        </Typography>
        <Button
          variant="text"
          color="secondary"
          onClick={onEdit}
          data-test-id="location-details-edit-btn"
        >
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </Button>
      </S.CardHeader>
      <S.CardStack>
        <div>
          <Typography fontWeight="bold" color={palette.text.secondary}>
            ID
          </Typography>{' '}
          <Typography>{location?.id}</Typography>
        </div>
        <div>
          <Typography fontWeight="bold" color={palette.text.secondary}>
            Location
          </Typography>{' '}
          <Typography data-test-id="location-details-location">
            {location?.location}
          </Typography>
        </div>
      </S.CardStack>
      <S.CardStack>
        <div>
          <Typography fontWeight="bold" color={palette.text.secondary}>
            Postal Code
          </Typography>{' '}
          <Typography data-test-id="location-details-postalcode">
            {location?.postalCode}
          </Typography>
        </div>
        <div>
          <Typography fontWeight="bold" color={palette.text.secondary}>
            Last Updated
          </Typography>{' '}
          <Typography>{$dayjs(location?.lastUpdated).fromNow()}</Typography>
        </div>
      </S.CardStack>
      <S.CardStack>
        <div>
          <Typography fontWeight="bold" color={palette.text.secondary}>
            Country
          </Typography>{' '}
          <Typography data-test-id="location-details-country">
            {location?.country}
          </Typography>
        </div>
      </S.CardStack>
    </S.StyledDetailsCard>
  );
};

export default DetailsCard;
