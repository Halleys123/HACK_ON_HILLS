import LoggedInContext from '@/context/LoggedInContext';
import { useContext } from 'react';

export function useLoggedIn() {
  if (!LoggedInContext) {
    throw new Error('useLoggedIn must be used within a LoggedInProvider');
  }
  return useContext(LoggedInContext);
}
