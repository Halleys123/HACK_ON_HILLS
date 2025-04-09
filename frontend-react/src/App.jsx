import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from '@/pages/Signup';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route index element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
