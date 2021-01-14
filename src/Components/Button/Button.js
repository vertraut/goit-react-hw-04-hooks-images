import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ action }) {
  return (
    <div className="LoadMore">
      <button className="Button" onClick={action}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  action: PropTypes.func.isRequired,
};
