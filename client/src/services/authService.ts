import type { AxiosError, AxiosInstance } from 'axios';
import type { UserAuthType, UserLoginType, UserSignUpType } from '../types/userTypes';
import axiosInstance from './apiInstance';

class AuthService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async checkUser(): Promise<UserAuthType> {
    const response = await this.apiInstance<UserAuthType>('/auth/check');
    return response.data;
  }

  async signUpUser(formData: UserSignUpType): Promise<UserAuthType> {
    try {
      const response = await this.apiInstance.post<UserAuthType>('/auth/signup', formData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<Error>;
      throw new Error(err.response?.data.message);
    }
  }

  async loginUser(formData: UserLoginType): Promise<UserAuthType> {
    const response = await this.apiInstance.post<UserAuthType>('/auth/login', formData);
    return response.data;
  }

  async logout(): Promise<void> {
    await this.apiInstance('/auth/logout');
  }

  async refresh(): Promise<UserAuthType> {
    const response = await this.apiInstance<UserAuthType>('/tokens/refresh');
    return response.data;
  }
}

export default new AuthService(axiosInstance);
