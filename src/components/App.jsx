import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import { GlobalStyle } from './Globalstyle';
import { Layout } from './Layout';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { fetchContents } from 'services/fetchImages';

const INITIALE_STATE = {
  nameQuery: '',
  page: 1,
  dataImages: [],
  isLoading: false,
  showModal: false,
  error: null,
};

export class App extends Component {
  state = { ...INITIALE_STATE };

  imageModal = '';

  async componentDidUpdate(_, prevState) {
    if (
      prevState.nameQuery === this.state.nameQuery &&
      prevState.page === this.state.page
    )
      return;

    if (prevState.nameQuery !== this.state.nameQuery)
      prevState.dataImages.length = 0;

    try {
      this.setState({ isLoading: true });

      const {
        data: { hits },
      } = await fetchContents(this.state);

      this.setState({
        dataImages: [
          ...prevState.dataImages,
          ...hits.map(hit => {
            const { id, largeImageURL, webformatURL } = hit;
            return { id, largeImageURL, webformatURL };
          }),
        ],
        isLoadMore: true,
      });
    } catch (error) {
      this.setState({ error });
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleNameQuery = searchName =>
    this.setState({
      nameQuery: searchName,
    });

  handleLoadMore = () =>
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleShowImage = imageUrl => {
    this.imageModal = imageUrl;
  };

  createNotification = message => {
    return () => {
      NotificationManager.error(message);
    };
  };

  render() {
    const { isLoading, dataImages, nameQuery, showModal, error } = this.state;

    return (
      <Layout>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleNameQuery} />
        {error && this.createNotification(error.message)}
        <ImageGallery
          images={dataImages}
          name={nameQuery}
          onClick={this.handleShowImage}
          onOpen={this.toggleModal}
        />
        {isLoading && <Loader />}
        {dataImages.length && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal img={this.imageModal} onClose={this.toggleModal} />
        )}
        <NotificationContainer />
      </Layout>
    );
  }
}
