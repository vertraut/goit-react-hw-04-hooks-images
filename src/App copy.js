import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    query: '',
    status: 'idle',
  };

  pageIncrement = () => {
    //увеличивает страницу при нажатии на кнопку "показать еще"
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  setQuery = value => {
    //обновляет query и ресетит images и currentPage при новом запросе
    if (value !== this.state.query) {
      this.setState({ query: value, images: [], currentPage: 1 });
    }
  };

  changeStatus = status => {
    this.setState({ status: status });
  };

  addImages = images => {
    //добавляет новые изображения в стейт с сохранением предыдущего значения
    this.setState(prevState => ({
      images: [...prevState.images, ...images.hits],
    }));
  };

  render() {
    const { query, status, images, currentPage } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.setQuery} />

        <ImageGallery
          query={query}
          status={status}
          changeStatus={this.changeStatus}
          pageIncrement={this.pageIncrement}
          images={images}
          currentPage={currentPage}
          addImages={this.addImages}
        />

        <ToastContainer />
      </div>
    );
  }
}
