import PropTypes from 'prop-types';
import { Overlay, ModalWin } from './Modal.styled';
import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = evt => {
    if (evt.target === evt.currentTarget) this.props.onClose();
  };

  render() {
    return (
      <Overlay onClick={this.handleBackDropClick}>
        <ModalWin>
          <img src={this.props.img} alt={'modal window with foto'} />
        </ModalWin>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
