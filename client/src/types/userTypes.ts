export type UserType = {
  id: number;
  username: string;
  email: string;
};

export type UserSignUpType = Omit<UserType, 'id'>;
export type UserLoginType = Pick<UserType, 'email'> & { password: string };

export type UserAuthType = {
  accessToken: string;
  user: UserType;
};

export type UserStateType =
  | { status: 'pending' }
  | { status: 'guest' }
  | ({ status: 'logged' } & UserType);
