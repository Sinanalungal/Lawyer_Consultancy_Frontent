import { AxiosInstance } from 'axios';
import AccessTokenManager from '../../redux/slice/interceptor'; 
import { BASE_URL } from '../../constants';

//This Instance is for the creating the axios instance..
export const getAxiosInstance = async (): Promise<AxiosInstance> => {
  const authTokens = localStorage.getItem('authTokens');
  const parsedTokens = JSON.parse(authTokens);
  console.log(parsedTokens,'chekcing');
  
  const accessTokenManager = new AccessTokenManager(BASE_URL, parsedTokens);
  const axiosInstance = await accessTokenManager.createAxiosInstance();
  return axiosInstance;
};