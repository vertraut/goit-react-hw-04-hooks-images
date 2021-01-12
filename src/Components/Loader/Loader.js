import Spinner from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import React from 'react';

export default function Loader({ size }) {
  return (
    <div className="Loader">
      <Spinner
        type="Bars"
        color="#3F51B5"
        height={size}
        width={size}
        timeout={3000} //3 secs
      />
    </div>
  );
}
