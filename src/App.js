import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Components/Searchbar';
// import Button from './Components/Button';
import ImageGallery from './Components/ImageGallery';
// import ImageGalleryItem from './Components/ImageGalleryItem';
// import Loader from './Components/Loader';
// import Modal from './Components/Modal';

export default class App extends Component {
  state = {
    query: '',
    status: 'idle',
  };

  setQuery = value => {
    this.setState({ query: value });
  };

  changeStatus = status => {
    this.setState({ status: status });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.setQuery} />
        <ImageGallery query={this.state.query} />

        <ToastContainer />
      </div>
    );
  }
}
