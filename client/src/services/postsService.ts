import type { AxiosInstance } from 'axios';
import type { PostFormType, PostType } from '../types/postTypes';
import axiosInstance from './apiInstance';

class PostsService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async getPosts(): Promise<PostType[] | []> {
    const response = await this.apiInstance<PostType[]>('/posts');
    if (response.status === 200) {
      return response.data;
    }
    return [];
  }

  async submitPost(formData: PostFormType): Promise<PostType> {
    const response = await this.apiInstance.post<PostType>('/posts', formData);
    if (response.status === 200) {
      return response.data;
    }
    return Promise.reject(new Error('Submit error'));
  }

  async deletePost(id: PostType['id']): Promise<void> {
    void this.apiInstance.delete<PostType>(`/posts/${id}`);
  }

  async editPost(formData: PostFormType, id: PostType['id']): Promise<PostType> {
    const response = await this.apiInstance.patch<PostType>(`/posts/${id}`, formData);
    return response.data;
  }
}

export default new PostsService(axiosInstance);
