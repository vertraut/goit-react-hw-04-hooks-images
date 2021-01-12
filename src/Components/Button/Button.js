import React from 'react';

export default function Button({ action }) {
  return (
    <div className="LoadMore">
      <button className="Button" onClick={action}>
        Load more
      </button>
    </div>
  );
}
