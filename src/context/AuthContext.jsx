import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get('/api/v2/users/profile', {
        withCredentials: true, 
      });

      setUser(data);
    } catch (error) {
      setUser(null); 
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
