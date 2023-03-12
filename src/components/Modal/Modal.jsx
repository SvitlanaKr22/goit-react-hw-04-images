import PropTypes from 'prop-types';
import { Overlay, ModalWin } from './Modal.styled';
import { useEffect } from 'react';

export default function Modal({ img, onClose }) {
  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = evt => {
    if (evt.target === evt.currentTarget) onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <Overlay onClick={handleBackDropClick}>
      <ModalWin>
        <img src={img} alt={'modal window with foto'} />
      </ModalWin>
    </Overlay>
  );
}

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
