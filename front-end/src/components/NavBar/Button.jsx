import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css"

function Button(title, link, testId) {
  return (
    <div>
      <Link
        to={link}
        onClick={async () => {
          if (title === 'Sair') await localStorage.clear();
        }}
      >
        <button className="buttons" data-testid={testId} type="button">
          <p style={{ textAlign: 'left' }}>{`${title}`}</p>
        </button>
      </Link>
    </div>
  );
}

export default Button;
