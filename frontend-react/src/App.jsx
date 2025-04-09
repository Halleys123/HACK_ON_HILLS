import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HotelLanding from './pages/HotelLanding/HotelLanding';
import LandingPage from './pages/LandingPage/LandingPage';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Maps from './pages/Maps/Maps';
import Signup from '@/pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route path='hotels' element={<Maps />}></Route>
        <Route path='/hotels/:hotelId' element={<HotelLanding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
