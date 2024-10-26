import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography
} from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      alert('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" align="center" sx={{ my: 2 }}>User List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Geo-Location</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {`${user.address.suite}, ${user.address.street}, ${user.address.city}`}
              </TableCell>
              <TableCell>
                {`Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}`}
              </TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
              </TableCell>
              <TableCell>
                {user.company.name}<br />
                <i>{user.company.catchPhrase}</i><br />
                <small>{user.company.bs}</small>
              </TableCell>
              <TableCell>
                <Button component={Link} to={`/edit/${user.id}`} variant="contained" sx={{ mr: 1 }}>Edit</Button>
                <Button onClick={() => deleteUser(user.id)} variant="outlined" color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
