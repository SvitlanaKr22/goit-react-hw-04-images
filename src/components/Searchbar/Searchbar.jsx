import PropTypes from 'prop-types';
import Searchform from 'components/Searchform/Searchform';
import { Header } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => (
  <Header>
    <Searchform onSearch={onSubmit}></Searchform>
  </Header>
);

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
