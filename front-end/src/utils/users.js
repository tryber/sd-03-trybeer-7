import React from 'react';
import { registerUser } from '../services';
import { Redirect } from 'react-router-dom';

const minimumPasswordLength = 6;
const minimumNameLength = 12;

const emailValidation = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!email && typeof email === 'string' && !!email.match(emailRegex);
};

const nameValidation = (name) => {
  const nameRegex = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
  return !!name && typeof name === 'string' && !!name.match(nameRegex)
    && name.length >= minimumNameLength;
};

const passwordValidation = (password) => password.length >= minimumPasswordLength;

const submitUser = async (name, email, password, role) => {
  const userRole = role ? 'administrator' : 'client';
  const token = await registerUser(name, email, password, userRole);
  return token;
};

const redirectByUserRole = () => {
  const { role } = JSON.parse(localStorage.getItem('user'));
    return role === 'administrator' ? <Redirect to="/admin/orders" /> : <Redirect to="/products" />;
}

export {
  emailValidation,
  nameValidation,
  passwordValidation,
  submitUser,
  redirectByUserRole,
  minimumPasswordLength,
  minimumNameLength,
}
