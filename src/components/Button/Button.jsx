import { ButtonLoad } from './Button.styled';

const Button = ({ onClick }) => (
  <ButtonLoad type="button" onClick={onClick}>
    Load more
  </ButtonLoad>
);

export default Button;
