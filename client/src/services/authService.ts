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
      console.log('📤 Signup request data:', formData);
      const response = await this.apiInstance.post<UserAuthType>('/auth/signup', formData);
      console.log('✅ Signup response:', response.data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Signup error:', err.response?.data);
      
      // ✅ ИСПРАВЛЕНО: правильное извлечение сообщения об ошибке
      const errorMessage = (err.response?.data as any)?.error || 
                          (err.response?.data as any)?.message || 
                          'Registration failed';
      
      throw new Error(errorMessage);
    }
  }

  async loginUser(formData: UserLoginType): Promise<UserAuthType> {
    try {
      console.log('📤 Login request data:', formData);
      const response = await this.apiInstance.post<UserAuthType>('/auth/login', formData);
      console.log('✅ Login response:', response.data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Login error:', err.response?.data);
      
      const errorMessage = (err.response?.data as any)?.error || 
                          (err.response?.data as any)?.message || 
                          'Login failed';
      
      throw new Error(errorMessage);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.apiInstance('/auth/logout');
      console.log('✅ Logout successful');
    } catch (error) {
      console.log('❌ Logout error:', error);
      throw error;
    }
  }

  async refresh(): Promise<UserAuthType> {
    try {
      const response = await this.apiInstance<UserAuthType>('/tokens/refresh');
      console.log('✅ Token refresh successful');
      return response.data;
    } catch (error) {
      console.log('❌ Token refresh error:', error);
      throw error;
    }
  }
}

export default new AuthService(axiosInstance);