import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';
import apiServices from '../../Services/pixabay-api';
import Loader from '../Loader';
export default class ImageGallery extends Component {
  state = {
    error: null,
    loadingMore: false,
    openModal: false,
    largeImg: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { changeStatus, query, currentPage } = this.props;
    if (prevProps.query !== query) {
      changeStatus('pending');
      this.getImg(query);
    }

    if (prevProps.currentPage < currentPage) {
      this.getImg(query);
    }
  }

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  loadingMoreOn = () => {
    this.setState({ loadingMore: true });
  };

  loadingMoreOff = () => {
    this.setState({ loadingMore: false });
  };

  getImg(query) {
    const { changeStatus, currentPage, addImages } = this.props;

    apiServices(query, currentPage)
      .then(images => {
        addImages(images);
        changeStatus('resolved');
      })
      .catch(error => {
        this.setState({ error });
        changeStatus('rejected');
      })
      .finally(() => {
        if (this.state.loadingMore) {
          this.scroll();
          this.loadingMoreOff();
        }
      });
  }

  toggleModal = e => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
    }));
  };

  setLargeImg = (alt, img) => {
    this.setState({ largeImg: { alt, img } });
    this.toggleModal();
  };

  galleryGeneration = () => {
    const { images } = this.props;
    const { loadingMore } = this.state;

    if (images.length > 0) {
      return (
        <>
          <ul className="ImageGallery">
            {images.map(img => (
              <ImageGalleryItem
                key={img.id}
                img={img.webformatURL}
                largeImg={img.largeImageURL}
                alt={img.tags}
                onClick={this.setLargeImg}
              />
            ))}
          </ul>
          {!loadingMore && <Button action={this.LoadMore} />}
          {loadingMore && <Loader size={50} />}
        </>
      );
    }
    return (
      <div className="MsgNothing">По вашему запросу ничего не найдено!</div>
    );
  };

  LoadMore = () => {
    this.loadingMoreOn();
    this.props.pageIncrement();
  };

  render() {
    const { error, openModal, largeImg } = this.state;
    const { status } = this.props;

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
              onClick={this.toggleModal}
              src={largeImg.img}
              alt={largeImg.alt}
            />
          )}
          {this.galleryGeneration()}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  changeStatus: PropTypes.func.isRequired,
  pageIncrement: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }),
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  addImages: PropTypes.func.isRequired,
};
