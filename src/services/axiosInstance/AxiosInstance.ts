import axios, { AxiosInstance } from 'axios';
import AccessTokenManager from '../../redux/slice/interceptor';
import { BASE_URL } from '../../constants';

// This function creates the Axios instance
export const getAxiosInstance = async (): Promise<AxiosInstance> => {
  const authTokens = localStorage.getItem('authTokens');
  const parsedTokens = authTokens ? JSON.parse(authTokens) : null;
  console.log(parsedTokens, 'checking');

  const accessTokenManager = new AccessTokenManager(BASE_URL, parsedTokens);
  const axiosInstance = await accessTokenManager.createAxiosInstance();

  // Ensure credentials are included in all requests
  axiosInstance.defaults.withCredentials = true;

  return axiosInstance;
};
