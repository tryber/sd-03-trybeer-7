import React from 'react';
import AdminButtons from './AdminButtons';
import '../NavBar.css';

function AdminSideBar() {
  return (
    <div
      className="side-menu-container"
      style={ { width: '250px' } }
    >
      <AdminButtons />
    </div>
  );
}

export default AdminSideBar;
