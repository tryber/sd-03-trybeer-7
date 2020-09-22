import React, { useState } from 'react'
import UserToken from './context';

const Provider = ({ children }) => {
  const [token, setToken] = useState(null);
  const storeContext = {
    token,
    setToken,
  };

  return <UserToken.Provider value={storeContext}>{children}</UserToken.Provider>;
};

export default Provider;