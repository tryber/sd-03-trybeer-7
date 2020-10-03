import React from 'react';
import ClientButtons from './ClientButtons';

const ClientSideBar = () => (
  <div
    className="side-menu-container"
    style={{ width: '100px', height: '640px', backgroundColor: 'black', position: 'absolute' }}
  >
    <ClientButtons />
  </div>
);

export default ClientSideBar;
