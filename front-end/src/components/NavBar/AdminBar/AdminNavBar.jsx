import React from 'react';
import PropTypes from 'prop-types';
import AdminSideBar from './AdminSideBar';

function AdminNavBar({ title }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <h2 data-testid="top-title">{`${title}`}</h2>
      </div>
      <AdminSideBar />
    </div>
  );
}

AdminNavBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AdminNavBar;
