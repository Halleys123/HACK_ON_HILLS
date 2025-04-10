import { useState } from 'react';

export default function useLoading() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Loading!!! Please Wait...');

  return { message, loading, setLoading, setMessage };
}
