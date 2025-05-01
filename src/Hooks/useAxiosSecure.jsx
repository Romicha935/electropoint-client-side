import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // আপনার server baseURL
  withCredentials: true, // COOKIE পাঠাবে
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token'); // যদি token store করেন
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => axiosSecure.interceptors.response.eject(interceptor);
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
