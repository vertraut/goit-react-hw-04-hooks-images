import React from 'react';

export default function ImageGalleryItem({ img }) {
  const { webformatURL, tags } = img;

  return (
    <li className="ImageGalleryItem">
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}
