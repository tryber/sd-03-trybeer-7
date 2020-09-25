import React from 'react';
import { Link } from 'react-router-dom';

function Buttons(title, link, testId) {
  return (
    <div>
      <Link to={ link }>
        <button data-testid={ testId } type="button">
          <p>{`${title}`}</p>
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
