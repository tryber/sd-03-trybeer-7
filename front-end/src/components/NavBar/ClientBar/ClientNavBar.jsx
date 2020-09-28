import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ClientSideBar from './ClientSideBar';

function renderNavBar(showBar, setShowBar) {
  return showBar === true ? setShowBar(false) : setShowBar(true);
}

function ClientNavBar({title}) {
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
        <h2 data-testid="top-title">{`${title}`}</h2>
      </div>
      {showBar === true ? ClientSideBar() : null}
    </div>
  );
}

ClientNavBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ClientNavBar;
