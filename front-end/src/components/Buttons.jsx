import React from 'react';
import { Link } from 'react-router-dom';

function Buttons(title, link, testId) {
  return (
    <div>
      <Link to={link}>
        <button style={{border: "none", backgroundColor: "black", color: "white"}} data-testid={testId} type="button">
          <p>{`${title}`}</p>
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
