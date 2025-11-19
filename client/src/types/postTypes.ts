export type PostType = {
  id: number;
  title: string;
  body: string;
};

export type PostFormType = Omit<PostType, 'id'>;

export type PostHandlersType = {
  deleteHandler: (id: PostType['id']) => Promise<void>;
  submitHandler: (e: React.FormEvent, formData: PostFormType) => Promise<void>;
};

export type PostsActionType =
  | { type: 'SET_POSTS'; payload: PostType[] }
  | { type: 'DELETE_POST'; payload: PostType['id'] }
  | { type: 'ADD_POST'; payload: PostType };
