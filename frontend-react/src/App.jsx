import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from '@/pages/Signup';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage/LandingPage';
import Maps from './pages/Maps/Maps';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route path='maps' element={<Maps />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
