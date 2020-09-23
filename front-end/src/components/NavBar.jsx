import React from 'react';

function NavBar() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'black', color: "white", width: "360px" }}>
        <button style={{position: "fixed", left: "10px", top: "20px"}}>=</button>
        <h2>Trybeer</h2>
      </div>
    </div>
  );
}

export default NavBar;
