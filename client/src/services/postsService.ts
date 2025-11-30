import type { AxiosInstance } from 'axios';
import type { PostFormType, PostType, PostsResponse } from '../types/postTypes';
import axiosInstance from './apiInstance';


class PostsService {
  constructor(private readonly apiInstance: AxiosInstance) {}

   async getPosts(page: number = 1, limit: number = 10): Promise<PostType[]> {
    try {
      console.log(`🔄 Fetching posts page ${page}, limit ${limit}`);
      const response = await this.apiInstance.get<PostType[]>(
        `/posts?page=${page}&limit=${limit}` // ✅ ДОБАВЬ ПАРАМЕТРЫ
      );
      console.log('📥 GET Posts response:', response.status, response.data);
      return response.data;
    } catch (error) {
      console.error('❌ GET Posts error:', error);
      return [];
    }
  }

  async submitPost(formData: PostFormType): Promise<PostType> {
    try {
      console.log('🔄 Submitting post:', formData);
      const response = await this.apiInstance.post<PostType>('/posts', formData);
      console.log('✅ POST created response:', response.status, response.data);
      
      // ✅ ПРИНИМАЕМ ЛЮБОЙ УСПЕШНЫЙ СТАТУС (200, 201, и т.д.)
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      
      return Promise.reject(new Error(`Unexpected status: ${response.status}`));
    } catch (error: any) {
      console.error('❌ Submit post error:', error);
      return Promise.reject(error);
    }
  }

  async deletePost(id: PostType['id']): Promise<void> {
    try {
      await this.apiInstance.delete(`/posts/${id}`);
    } catch (error) {
      console.error('❌ Delete post error:', error);
      return Promise.reject(error);
    }
  }

  async editPost(formData: PostFormType, id: PostType['id']): Promise<PostType> {
    try {
      const response = await this.apiInstance.patch<PostType>(`/posts/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error('❌ Edit post error:', error);
      return Promise.reject(error);
    }
  }

  async publishPost(id: PostType['id']): Promise<PostType> {
    try {
      console.log('🔄 Publishing post:', id);
      const response = await this.apiInstance.patch<PostType>(`/posts/${id}/publish`);
      console.log('✅ Post published successfully, response:', response.data);
      
      // ✅ ПРОВЕРЬ ЧТО В ОТВЕТЕ ЕСТЬ id
      if (!response.data.id) {
        throw new Error('Invalid response: post id is missing');
      }
      
      return response.data; // ✅ возвращаем данные
    } catch (error) {
      console.error('❌ Publish post error:', error);
      return Promise.reject(error);
    }
  }

  // для пагинации!!! возможно, что лучше переименовать
async getPublishedPosts(page: number = 1, limit: number = 6): Promise<PostsResponse> {
  try {
    console.log(`🔄 Fetching published posts page ${page}, limit ${limit}`);
    const response = await this.apiInstance.get<PostsResponse>(
      `/posts/published?page=${page}&limit=${limit}`
    );
    console.log('✅ Published posts fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Get published posts error:', error);
    return Promise.reject(error);
  }
}

// ✅ ПЕРЕМЕСТИТЬ В КОРЗИНУ
async moveToTrash(id: PostType['id']): Promise<PostType> {
  try {
    console.log('🗑️ Moving post to trash:', id);
    const response = await this.apiInstance.patch<PostType>(`/posts/${id}/trash`);
    console.log('✅ Post moved to trash:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Move to trash error:', error);
    return Promise.reject(error);
  }
}

// ✅ ВОССТАНОВИТЬ ИЗ КОРЗИНЫ
async restoreFromTrash(id: PostType['id']): Promise<PostType> {
  try {
    console.log('🔄 Restoring post from trash:', id);
    const response = await this.apiInstance.patch<PostType>(`/posts/${id}/restore`);
    console.log('✅ Post restored:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Restore from trash error:', error);
    return Promise.reject(error);
  }
}

// ✅ ПОЛУЧИТЬ КОРЗИНУ ПОЛЬЗОВАТЕЛЯ
async getUserTrash(): Promise<PostType[]> {
  try {
    console.log('📦 Getting user trash');
    const response = await this.apiInstance.get<PostType[]>('/posts/user/trash');
    console.log('✅ User trash retrieved:', response.data.length, 'posts');
    return response.data;
  } catch (error) {
    console.error('❌ Get user trash error:', error);
    return Promise.reject(error);
  }
}

}

export default new PostsService(axiosInstance);