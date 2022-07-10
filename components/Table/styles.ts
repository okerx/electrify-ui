import styled from '@emotion/styled';

export const TableMainWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '1px solid rgb(224, 224, 224)',
  borderRadius: '7px',
  margin: '1rem',
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
    borderBottom: '1px solid #e0e0e0',
    'td, th': {
      textOverflow: 'ellipsis',
      padding: '0 56px 0 0',
      textAlign: 'left',
      '&:first-of-type': { padding: '0 56px 0 24px' },
      '&:last-of-type': { padding: '0 24px 0 0' },
    },
  },
});

export const StyledTableHead = styled('thead')({
  tr: {
    height: '64px',
    padding: '0 24px',
    th: {
      color: 'rgba(0, 0, 0, .54)',
      fontSize: '12px',
      fontWeight: 500,
      textAlign: 'left',
      verticalAlign: 'middle',
      '.material-icons': {
        fontSize: '18px',
        verticalAlign: 'middle',
        paddingRight: '8px',
      },
    },
  },
});

export const StyledTableBody = styled('tbody')({
  tr: {
    height: '48px',
    cursor: 'pointer',
    '&:hover': { background: '#eee' },
    td: {
      color: 'rgba(0, 0, 0, .87)',
      fontWeight: 500,
    },
  },
});

export const StyledTableFooter = styled('footer')({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0.3em 1.5rem',

  '& > *:not(:last-of-type)': {
    marginRight: '1rem',
  },
});

export const TableFooterNextPrev = styled('div')({
  '& > button': {
    padding: '0.5rem',
    color: 'rgba(0, 0, 0, .87)',

    '&:first-of-type': {
      marginRight: '1rem',
    },

    '&:disabled': {
      color: 'rgb(224, 224, 224)',
    },
  },
});
