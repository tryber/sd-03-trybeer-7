import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button(title, link, testId) {
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

Button.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default Button;
