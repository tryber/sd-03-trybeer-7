import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import AuthContext from './AuthContext';

const initialTokenState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

export default ({ children }) => {
  const [token, setToken] = useState(initialTokenState);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;
    const decodedData = jwt(token);
    const userData = { ...decodedData.data, token };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser((previousUser) => ({ ...previousUser, ...userData }));
    setLoggedIn(true);
    return () => {
      setToken(null);
      setUser(null);
      setLoggedIn(false);
    };
  }, [token, user]);

  const store = {
    setToken,
    loggedIn,
    user,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
