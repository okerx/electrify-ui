import styled from '@emotion/styled';

export const ModalWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  height: '100vh',
  width: '100vw',
  top: '0',
  left: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(3px)',
  zIndex: 333,
  display: 'flex',
  overflow: 'auto',
  padding: theme.spacing(16, 4),
  '&.modal-enter .modal-content': { opacity: 0, transform: 'scale(0.9)' },
  '&.modal-enter-active .modal-content': {
    opacity: 1,
    transform: 'translateX(0)',
    transition: 'all 0.2s',
  },
  '&.modal-exit .modal-content': { opacity: 1 },
  '&.modal-exit-active .modal-content': {
    opacity: 0,
    transform: 'scale(0.9)',
    transition: 'all 0.2s',
  },
}));

export const StyledModal = styled('div')<{ maxWidth: number }>(
  ({ maxWidth, theme }) => ({
    backgroundColor: theme.palette.background.paper,
    maxWidth,
    width: '100%',
    boxShadow:
      '0 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),0px 1px 3px 0px rgb(0 0 0 / 12%)',
    height: 'fit-content',
    margin: theme.spacing('auto'),
    borderRadius: '10px',
    padding: theme.spacing(4, 6, 0),
  }),
);

export const ModalHeader = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  button: { width: '30px', height: '30px' },
});

export const ModalBody = styled('div')(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));
