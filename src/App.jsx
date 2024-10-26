import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import UserList from './components/UserList';
import AddEditUser from './components/AddEditUser';

const App = () => (
  <Router>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/add">Add User</Button>
      </Toolbar>
    </AppBar>

    <Container sx={{ mt: 4 }}>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddEditUser />} />
        <Route path="/edit/:id" element={<AddEditUser />} />
      </Routes>
    </Container>
  </Router>
);

export default App;
