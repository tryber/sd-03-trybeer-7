const userLogin = async (email, password) => {
  const request = fetch('http://localhost:3001/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => data.token)
    .catch((error) => error);
  return request;
};

const registerUser = async (name, email, password, role) => {
  const request = fetch('http://localhost:3001/user/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        name,
        email,
        password,
        role,
      },
    ),
  })
    .then((response) => response.json())
    .then((data) => data.token)
    .catch((error) => error);
  return request;
};

export { userLogin, registerUser };
