import React, { Component } from 'react';

import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import apiServices from '../../Services/pixabay-api';
import Loader from '../Loader';
export default class ImageGallery extends Component {
  state = {
    error: null,
    loadingMore: false,
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

    setTimeout(() => {
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
    }, 1000);
  }

  galleryGeneration = () => {
    const { images } = this.props;

    return images.map(img => (
      <ImageGalleryItem key={img.id} img={img.webformatURL} alt={img.tags} />
    ));
  };

  LoadMore = () => {
    this.loadingMoreOn();
    this.props.pageIncrement();
  };

  render() {
    const { error, loadingMore } = this.state;
    const { status } = this.props;

    if (status === 'idle') {
      return <div>Введите запрос</div>;
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
          <ul className="ImageGallery">{this.galleryGeneration()}</ul>
          {!loadingMore && <Button action={this.LoadMore} />}
          {loadingMore && <Loader size={50} />}
        </div>
      );
    }
  }
}
