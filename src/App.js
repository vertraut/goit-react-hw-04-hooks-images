import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');

  const pageIncrement = () => {
    //увеличивает страницу при нажатии на кнопку "показать еще"
    setCurrentPage(prevState => prevState + 1);
  };

  const setNewQuery = newQuery => {
    if (query === newQuery) return;
    setCurrentPage(1);
    setImages([]);
    setQuery(newQuery);
  };

  const addImages = images => {
    //добавляет новые изображения в стейт с сохранением предыдущего значения
    setImages(prevState => [...prevState, ...images]);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={setNewQuery} />

      <ImageGallery
        query={query}
        status={status}
        setStatus={setStatus}
        pageIncrement={pageIncrement}
        images={images}
        currentPage={currentPage}
        setImages={addImages}
      />

      <ToastContainer />
    </div>
  );
}
