import { forwardRef, MouseEventHandler, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import Typography from '@/components/Typography';
import { ModalProps } from './types';
import * as S from './styles';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ title, open, setOpen, children, maxWidth = 600, ...props }, ref) => {
    const nodeRef = useRef(null);
    const handleClose: MouseEventHandler = () => {
      setOpen(false);
    };

    const stopPropagation: MouseEventHandler = e => {
      e.stopPropagation();
    };

    // disable body scroll on open
    useLayoutEffect(() => {
      const body = document.querySelector('body');
      if (open) {
        if (body) body.style.overflow = 'hidden';
      } else {
        if (body) body.style.overflow = 'auto';
      }
    }, [open]);

    if (typeof window === 'undefined') return null;

    return createPortal(
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={200}
        classNames="modal"
        unmountOnExit
      >
        <S.ModalWrapper onClick={handleClose} ref={nodeRef}>
          <S.StyledModal
            ref={ref}
            onClick={stopPropagation}
            className="modal-content"
            maxWidth={maxWidth}
            data-test-id="modal"
            {...props}
          >
            <S.ModalHeader>
              <Typography variant="h3">{title}</Typography>
              <button onClick={handleClose} data-test-id="modal-close-btn">
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
