import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';

const AddEditUser = () => {
  const [user, setUser] = useState({
    name: '', email: '', phone: '', website: '',
    address: { street: '', city: '', zipcode: '' },
    company: { name: '' }
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchUser(id);
  }, [id]);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (field, e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [field]: { ...prev[field], [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
        alert('User updated successfully!');
      } else {
        await axios.post('https://jsonplaceholder.typicode.com/users', user);
        alert('User added successfully!');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>{id ? 'Edit User' : 'Add User'}</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" fullWidth value={user.name} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" name="email" type="email" fullWidth value={user.email} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone" name="phone" fullWidth value={user.phone} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Website" name="website" fullWidth value={user.website} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Street" name="street" fullWidth value={user.address.street} onChange={(e) => handleNestedChange('address', e)} />
            <TextField label="City" name="city" fullWidth sx={{ mt: 2 }} value={user.address.city} onChange={(e) => handleNestedChange('address', e)} />
            <TextField label="Zipcode" name="zipcode" fullWidth sx={{ mt: 2 }} value={user.address.zipcode} onChange={(e) => handleNestedChange('address', e)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Company" name="name" fullWidth value={user.company.name} onChange={(e) => handleNestedChange('company', e)} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>{id ? 'Update' : 'Add'}</Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddEditUser;
