import styled from '@emotion/styled';
import { CommonColorVariants } from '@/theme/types';
import { BadgeSize } from '@/components/Badge/types';

export const BadgeWrapper = styled('div')<{
  $color: CommonColorVariants;
  $size: BadgeSize;
}>(({ theme, $size, $color }) => {
  const sizes = {
    // TODO: add multi-size styles
    small: {},
    medium: {},
    large: {},
  };

  return {
    ...sizes[$size],
    fontSize: '0.8125rem',
    whiteSpace: 'nowrap',
    borderRadius: '16px',
    backgroundColor: theme.palette[$color].main,
    color: theme.palette[$color].contrastText,
    height: '30px',
    display: 'flex',
    width: 'fit-content',
  };
});

export const StyledBadge = styled('span')(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  whiteSpace: 'nowrap',
  margin: theme.spacing('auto'),
}));
