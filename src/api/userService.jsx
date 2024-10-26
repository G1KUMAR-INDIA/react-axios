import axios from 'axios';
// this is given api link
// const API_URL = 'https://jsonplaceholder.typicode.com/users';
// after copying this api to mock.api
const API_URL = `https://66dec119de4426916ee23fe9.mockapi.io/axios/React-Axios`

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await axios.put(`${API_URL}/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};