import React, { Component } from 'react';

import ApiServices from './ApiServices';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '19101483-97eb89a6c64111aa623235b5f';

let currentPage = 1;
let perPage = 12;

export default class ImageGallery extends Component {
  state = {
    images: [],
  };

  getImg(query) {
    fetch(
      `${BASE_URL}?q=${query}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
    )
      .then(r => r.json())
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
        })),
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query != this.props.query) {
      this.clearImgState();
      this.getImg(this.props.query);
    }
  }

  clearImgState = () => {
    this.setState({ images: [] });
  };

  render() {
    return <ul className="ImageGallery"></ul>;
  }
}
