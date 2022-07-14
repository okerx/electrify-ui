import React, { useEffect } from 'react';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import useConfirm from './useConfirm';
import * as S from './styles';

const ConfirmDialog = () => {
  const { prompt = '', isOpen = false, proceed, cancel } = useConfirm();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (proceed && isOpen && e.key === 'Enter') {
        proceed();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [proceed, isOpen]);

  return (
    <Modal
      open={isOpen}
      setOpen={() => {
        cancel?.();
      }}
      title="Confirm"
    >
      <Typography>{prompt}</Typography>
      <S.DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          size="large"
          onClick={() => {
            cancel?.();
          }}
        >
          Cancel
        </Button>
        <Button
          color="secondary"
          size="large"
          onClick={() => {
            proceed?.();
          }}
        >
          Ok
        </Button>
      </S.DialogActions>
    </Modal>
  );
};

export default ConfirmDialog;
