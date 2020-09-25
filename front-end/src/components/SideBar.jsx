import React from 'react';
import AdminButtons from './AdminButtons';
import ClientButtons from './ClientButtons';

const SideBar = (role) => role === 'client' ? (
    <div
      className="side-menu-container"
      style={{ width: '250px', height: '460px', backgroundColor: 'black' }}
    >
      <ClientButtons />
    </div>
  ) : (
    <div style={{ width: '250px', height: '460px', backgroundColor: 'black' }}>
      <AdminButtons />
    </div>
  );

export default SideBar;
