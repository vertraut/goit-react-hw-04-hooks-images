import React from 'react';
import PropTypes from 'prop-types';
export default function ImageGalleryItem({ img, alt, onClick, largeImg }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={img}
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={() => onClick(alt, largeImg)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
};
