// services/likeService.ts
import apiInstance from './apiInstance';
import type { ToggleLikeResponse, LikesCountResponse, UserLikesResponse } from '../types/likeTypes';

class LikeService {
  /**
   * Переключение лайка на товаре/посте
   */
  async toggleLike(productId: number): Promise<ToggleLikeResponse> {
    const response = await apiInstance.post<ToggleLikeResponse>(
      `/products/${productId}/like`
    );
    return response.data;
  }

  /**
   * Получение количества лайков для товара/поста
   */
  async getLikesCount(productId: number): Promise<LikesCountResponse> {
    const response = await apiInstance.get<LikesCountResponse>(
      `/products/${productId}/likes`
    );
    return response.data;
  }

  /**
   * Получение списка лайкнутых товаров/постов пользователя
   */
  async getUserLikes(): Promise<UserLikesResponse> {
    const response = await apiInstance.get<UserLikesResponse>(
      '/users/me/likes'
    );
    return response.data;
  }

  /**
   * Получение лайков для нескольких товаров/постов одним запросом
   */
  async getMultipleLikesCount(productIds: number[]): Promise<LikesCountResponse[]> {
    const response = await apiInstance.post<LikesCountResponse[]>(
      '/products/likes/batch', // Теперь этот путь существует
      { productIds }
    );
    return response.data;
  }
}

export default new LikeService();