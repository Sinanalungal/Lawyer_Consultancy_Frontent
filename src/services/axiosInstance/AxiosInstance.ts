import { AxiosInstance } from 'axios';
import AccessTokenManager from '../../redux/slice/interceptor'; 
import { BASE_URL } from '../../constants';

//This Instance is for the creating the axios instance..
export const getAxiosInstance = async (user: any): Promise<AxiosInstance> => {
  const accessTokenManager = new AccessTokenManager(BASE_URL, user);
  const axiosInstance = await accessTokenManager.createAxiosInstance();
  return axiosInstance;
};