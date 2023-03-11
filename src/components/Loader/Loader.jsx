import { ColorRing } from 'react-loader-spinner';

const Loader = () => (
  <ColorRing
    visible={true}
    height="150"
    width="150"
    ariaLabel="blocks-loading"
    wrapperStyle={{ margin: '0 auto' }}
    wrapperClass="blocks-wrapper"
    colors={['#dae0e7', '#e6e7f0', '#5355c9', '#94999b', '#a2c3f3']}
  />
);
export default Loader;
