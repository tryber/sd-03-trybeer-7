const userLogin = async (email, password) => {
  const request = fetch('http://localhost:3001/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response
      .json()
      .then((data) => (response.ok
        ? Promise.resolve(data.token)
        : Promise.reject(data.message))));
  return request;
};

const registerUser = async (name, email, password, role) => {
  const request = fetch('http://localhost:3001/user/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role,
    }),
  })
    .then((response) => response
      .json()
      .then((data) => (response.ok
        ? Promise.resolve(data.token)
        : Promise.reject(data.message))));
  return request;
};

export { userLogin, registerUser };
