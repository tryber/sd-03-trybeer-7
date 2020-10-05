import React from 'react';
import { Link } from 'react-router-dom';

function Button(title, link, testId) {
  return (
    <div>
      <Link to={ link }>
        <button 
        className="buttons"
        data-testid={ testId } type="button">
          <p style={{textAlign: "left"}}>{`${title}`}</p>
        </button>
      </Link>
    </div>
  );
}

export default Button;
