import React from 'react';
import ClientButtons from './ClientButtons';

const ClientSideBar = () => (
  <div
    className="side-menu-container"
    style={{ width: '250px', height: '460px', backgroundColor: 'black' }}
  >
    <ClientButtons />
  </div>
);

export default ClientSideBar;
