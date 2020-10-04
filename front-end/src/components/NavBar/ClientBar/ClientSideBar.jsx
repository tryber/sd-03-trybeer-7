import React from 'react';
import ClientButtons from './ClientButtons';

const ClientSideBar = () => (
  <div
    className="side-menu-container"
    style={{ width: '180px', height: '640px', backgroundColor: 'black', position: 'fixed' }}
  >
    <ClientButtons />
  </div>
);

export default ClientSideBar;
