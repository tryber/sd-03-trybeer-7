import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SideBar from './SideBar';

function renderNavBar(showBar, setShowBar) {
  return showBar === true ? setShowBar(false) : setShowBar(true);
}

function NavBar({ title = 'Trybeer', role = 'test' }) {
  const [showBar, setShowBar] = useState(false);
  return (
    <div style={{ width: '360px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'black',
          color: 'white',
          width: '360px',
        }}
      >
        <button
          data-testid="top-hamburguer"
          type="button"
          onClick={() => renderNavBar(showBar, setShowBar)}
          style={{ position: 'fixed', left: '10px', top: '20px' }}
        >
          =
        </button>
        <h2 data-testid="top-title">{title}</h2>
      </div>
      {showBar === true ? SideBar(role) : null}
    </div>
  );
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NavBar;
