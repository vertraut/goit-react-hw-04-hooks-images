import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';
import apiServices from '../../Services/pixabay-api';
import Loader from '../Loader';
export default function ImageGallery({
  query,
  status,
  setStatus,
  pageIncrement,
  images,
  currentPage,
  setImages,
}) {
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [largeImg, setlargeImg] = useState({});

  const isFirstRender = useRef(true);

  useEffect(() => {
    //проверяем, если запрос пустой, выходим
    if (query === '') return;
    //Делаем запрос
    if (currentPage === 1) setStatus('pending');
    apiServices(query, currentPage)
      .then(images => {
        setImages(images.hits);
        setStatus('resolved');
      })
      .catch(error => {
        setError({ error });
        setStatus('rejected');
      })
      .finally(() => {
        if (loadingMore) {
          scroll();
          setLoadingMore(false);
        }
      });
  }, [query, currentPage, setStatus, setImages, loadingMore]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log(largeImg);
    toggleModal();
  }, [largeImg]);

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  function toggleModal() {
    setOpenModal(prevState => !prevState);
  }

  const galleryGeneration = () => {
    const galleryMarkup = (
      <ul className="ImageGallery">
        {images.map(img => (
          <ImageGalleryItem
            key={img.id}
            img={img.webformatURL}
            largeImg={img.largeImageURL}
            alt={img.tags}
            onClick={setlargeImg}
          />
        ))}
      </ul>
    );
    const btnLoadingMoreMarkup = (
      <>
        {!loadingMore && <Button action={LoadMore} />}
        {loadingMore && <Loader size={50} />}
      </>
    );

    if (images.length > 0) {
      return (
        <>
          {galleryMarkup}
          {images.length >= 12 && btnLoadingMoreMarkup}
        </>
      );
    }
    return (
      <div className="MsgNothing">По вашему запросу ничего не найдено!</div>
    );
  };

  const LoadMore = () => {
    setLoadingMore(true);
    pageIncrement();
  };

  if (status === 'idle') {
    return <div></div>;
  }

  if (status === 'pending') {
    return (
      <div>
        <Loader size={150} />
      </div>
    );
  }

  if (status === 'rejected') {
    return <div>{`Возникла ошибка ${error}`}</div>;
  }

  if (status === 'resolved') {
    return (
      <div>
        {openModal && (
          <Modal
            onClick={toggleModal}
            src={largeImg.largeImg}
            alt={largeImg.alt}
          />
        )}
        {galleryGeneration()}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  pageIncrement: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }),
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  setImages: PropTypes.func.isRequired,
};
