import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import { GlobalStyle } from './Globalstyle';
import { Layout } from './Layout';
import { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { fetchContents } from 'services/fetchImages';

export const App = () => {
  const [nameQuery, setNameQuery] = useState('');
  const [page, setPage] = useState(1);
  const [dataImages, setDataImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (nameQuery === '') return;

    async function fechImages() {
      try {
        setIsLoading(true);
        const {
          data: { hits },
        } = await fetchContents(nameQuery, page);

        setDataImages(prevState => [
          ...prevState,
          ...hits.map(hit => {
            const { id, largeImageURL, webformatURL } = hit;
            return { id, largeImageURL, webformatURL };
          }),
        ]);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fechImages();
  }, [nameQuery, page]);

  const handleNameQuery = searchName => {
    setDataImages([]); // очищаем массив с картинками при изменении поиска
    setNameQuery(searchName);
  };

  const handleLoadMore = () => setPage(prevPage => prevPage + 1);

  const toggleModal = () => setShowModal(prevState => !prevState);

  const handleShowImage = imageUrl => {
    setImageModal(imageUrl);
  };

  const createNotification = message => {
    return () => {
      NotificationManager.error(message);
    };
  };

  return (
    <Layout>
      <GlobalStyle />
      <Searchbar onSubmit={handleNameQuery} />
      {error && createNotification(error.message)}
      <ImageGallery
        images={dataImages}
        name={nameQuery}
        onClick={handleShowImage}
        onOpen={toggleModal}
      />
      {isLoading && <Loader />}
      {dataImages.length && <Button onClick={handleLoadMore} />}
      {showModal && <Modal img={imageModal} onClose={toggleModal} />}
      <NotificationContainer />
    </Layout>
  );
};
