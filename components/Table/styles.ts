import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TableMainWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: '7px',
}));

export const TableWrapper = styled('div')({
  maxWidth: '100%',
  overflowX: 'auto',
});

export const StyledTable = styled('table')({
  borderCollapse: 'collapse',
  borderSpacing: '0',
  width: '100%',
  overflow: 'hidden',

  tr: {
    'td, th': {
      textOverflow: 'ellipsis',
      padding: '0 56px 0 0',
      textAlign: 'left',
      '&:first-of-type': { padding: '0 56px 0 24px' },
      '&:last-of-type': { padding: '0 24px 0 0' },
    },
  },
});

export const StyledTableHead = styled('thead')(({ theme }) => ({
  tr: {
    height: '64px',
    padding: theme.spacing(0, 8),
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    th: {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      fontWeight: 500,
      textAlign: 'left',
      verticalAlign: 'middle',

      '& > button:hover svg': { opacity: '1' },
    },
  },
}));

export const StyledTableBody = styled('tbody')<{ $clickableRow: boolean }>(
  ({ theme, $clickableRow }) => ({
    tr: {
      height: '48px',
      cursor: $clickableRow ? 'pointer' : 'default',
      '&:not(:last-of-type)': {
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.divider,
      },
      '&:hover': { background: '#eee' },
      td: {
        color: theme.palette.text.primary,
        fontWeight: 500,
      },
    },
  }),
);

export const StyledTableFooter = styled('footer')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(1.2, 6),

  '& > *:not(:last-of-type)': {
    marginRight: theme.spacing(4),
  },
}));

export const TableFooterNextPrev = styled('div')(({ theme }) => ({
  '& > button': {
    padding: theme.spacing(2),
    color: 'rgba(0, 0, 0, .87)',

    '&:first-of-type': {
      marginRight: '1rem',
    },

    '&:disabled': {
      color: theme.palette.text.disabled,
    },
  },
}));

export const SortHoverIcon = styled(FontAwesomeIcon)({
  opacity: '0',
});
