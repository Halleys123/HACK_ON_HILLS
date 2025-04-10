import React from 'react';
import LoggedInContext from '@/context/LoggedInContext';
import { useState } from 'react';

export default function LoggedInProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
}
