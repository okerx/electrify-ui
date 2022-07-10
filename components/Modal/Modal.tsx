import { forwardRef, MouseEventHandler } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import Typography from '@/components/Typography';
import { ModalProps } from './types';
import * as S from './styles';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ title, open, setOpen, children, maxWidth = 600, ...props }, ref) => {
    const handleClose: MouseEventHandler = () => {
      setOpen(false);
    };

    const stopPropagation: MouseEventHandler = e => {
      e.stopPropagation();
    };

    if (typeof window === 'undefined') return null;

    return createPortal(
      <CSSTransition in={open} timeout={200} classNames="modal" unmountOnExit>
        <S.ModalWrapper onClick={handleClose}>
          <S.StyledModal
            ref={ref}
            onClick={stopPropagation}
            className="modal-content"
            maxWidth={maxWidth}
            {...props}
          >
            <S.ModalHeader>
              <Typography variant="h3">{title}</Typography>
              <button onClick={handleClose}>
                <FontAwesomeIcon
                  style={{ fontSize: '1.5rem' }}
                  icon={faTimes}
                />
              </button>
            </S.ModalHeader>
            <S.ModalBody>{children}</S.ModalBody>
          </S.StyledModal>
        </S.ModalWrapper>
      </CSSTransition>,
      document.querySelector('body') as Element,
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
