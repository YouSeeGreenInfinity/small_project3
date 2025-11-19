import type { AxiosInstance } from 'axios';
import type { CatType } from '../types/catTypes';
import axiosInstance from './apiInstance';

class CatsService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async getCats(): Promise<CatType[]> {
    const { data } = await this.apiInstance<CatType[]>('/cats');
    return data;
  }
}

export default new CatsService(axiosInstance);
