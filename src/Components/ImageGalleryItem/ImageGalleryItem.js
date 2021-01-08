import React from 'react';

export default function ImageGalleryItem({ img, alt }) {
  return (
    <li className="ImageGalleryItem">
      <img src={img} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
}
