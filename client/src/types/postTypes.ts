// export type PostType = {
//   id: number;
//   title: string;
//   body: string;
// };

export type PostType = {
  id: number;
  title: string;
  body: string;
  userId: number;
  published: boolean; // добавил для кнопки опубликовать
  createdAt: string;
  updatedAt: string;
  User?: {
    username: string;
  };
};

// старый вариант 
// export type PostFormType = Omit<PostType, 'id'>;

// // с Omit:
// export type PostFormType = Omit<PostType, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'User'>;

export type PostFormType = {
  title: string;
  body: string;
  published?: boolean;
};

export type PostHandlersType = {
  deleteHandler: (id: PostType['id']) => Promise<void>;
  submitHandler: (e: React.FormEvent, formData: PostFormType) => Promise<void>;
};

export type PostsActionType =
  | { type: 'SET_POSTS'; payload: PostType[] }
  | { type: 'DELETE_POST'; payload: PostType['id'] }
  | { type: 'ADD_POST'; payload: PostType };

  export type PostsResponse = {
    posts: PostType[];
    totalPages: number;
    currentPage: number;
    totalPosts: number;
  };
