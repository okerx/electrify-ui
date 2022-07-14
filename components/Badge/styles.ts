import styled from '@emotion/styled';
import { CommonColorVariants } from '@/theme/types';
import { BadgeSize } from '@/components/Badge/types';

export const BadgeWrapper = styled('div')<{
  $color: CommonColorVariants;
  $size: BadgeSize;
}>(({ theme, $size, $color }) => {
  const sizes = {
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

export const StyledBadge = styled('span')(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingRight: '0.75rem',
  paddingLeft: '0.75rem',
  whiteSpace: 'nowrap',
  margin: 'auto',
}));
