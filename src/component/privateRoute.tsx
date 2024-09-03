import React, { ReactElement, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { load } from '../store/localstorage.ts';
import { UserData } from '../interface/UserData.ts';
import { BaseURL } from '../costants/environment.ts';
import axios from 'axios';
interface PrivateRouteProps {
  children: ReactElement;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isUserAuthenticated, setUserAuthenticated] = useState<boolean | null>(
    null
  );
  const loginFromStore = async (username: string, password: string) => {
    const response = await axios.post(`${BaseURL}/login`, {
      username,
      password,
    });

    return response.data;
  };

  useEffect(() => {
    const login = async () => {
      const userData = load();
      if (userData) {
        const { username, password } = userData as UserData;
        await loginFromStore(username, password);
        setUserAuthenticated(true);
        return children;
      } else {
        setUserAuthenticated(false);
      }
    };

    login();
  }, []);

  if (isUserAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
export default PrivateRoute;
