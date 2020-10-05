import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../NavBar.css'

import ClientSideBar from './ClientSideBar';

function renderNavBar(showBar, setShowBar) {
  return showBar === true ? setShowBar(false) : setShowBar(true);
}

function ClientNavBar({ title }) {
  const [showBar, setShowBar] = useState(false);
  return (
    <div style={ { width: '360px' } }>
      <div className="top-bar" >
        <button
          className="top-icon"
          data-testid="top-hamburguer"
          type="button"
          onClick={ () => renderNavBar(showBar, setShowBar) }
        />
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
