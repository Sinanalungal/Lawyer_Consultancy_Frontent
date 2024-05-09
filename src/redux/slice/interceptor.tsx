import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


class AccessTokenManager {
  private readonly baseUrl: string;
  private user: any;

  constructor(baseUrl: string, user: any) {
    this.baseUrl = baseUrl;
    this.user = user;
  }

  private async getAccessToken(): Promise<string> {
    console.log('getting token...')
    return this.user.access;
  }

  private async refreshToken(): Promise<void> {
    console.log('refreshing token...')
    const refreshToken = this.user.refresh;
    const response = await axios.post(`${this.baseUrl}/token/refresh/`, { refresh: refreshToken });
    this.user.access = response.data.access;
  }

  private isAccessTokenExpired(): boolean {
    console.log('token checking...')
    const token = this.user.access;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const exp = decodedToken.exp * 1000; 
    return Date.now() >= exp;
  }

  public createAxiosInstance(): Promise<AxiosInstance> {
    const axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });

    axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const accessToken = await this.getAccessToken();
        console.log(accessToken);
        if (!accessToken) {
          throw new Error('Access token is missing');
        }

        if (this.isAccessTokenExpired() || Date.now() + 20000 >= this.getExpirationTime()) {
          await this.refreshToken(); 
        }

        config.headers.Authorization = `Bearer ${this.user.access}`;
        console.log('axios is ok')
        return config;
      },
      (error) => Promise.reject(error)
    );

    return Promise.resolve(axiosInstance);
  }

  private getExpirationTime(): number {
    console.log('expiration time checking...')
    const token = this.user.access;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const exp = decodedToken.exp * 1000; // Convert seconds to milliseconds
    console.log(exp)
    return exp;
  }
}

export default AccessTokenManager;
