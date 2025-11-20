// export type UserType = {
//   id: number;
//   username: string;
//   email: string;
// };

// export type UserSignUpType = Omit<UserType, 'id'>;
// export type UserLoginType = Pick<UserType, 'email'> & { password: string };

// export type UserAuthType = {
//   accessToken: string;
//   user: UserType;
// };

// export type UserStateType =
//   | { status: 'pending' }
//   | { status: 'guest' }
//   | ({ status: 'logged' } & UserType);


export type UserType = {
  id: number;
  username: string;
  email: string;
};

// ✅ ИСПРАВЛЕНО: Добавляем password в базовый тип для регистрации
export type UserWithPasswordType = UserType & {
  password: string;
};

export type UserSignUpType = Omit<UserWithPasswordType, 'id'>;
export type UserLoginType = Pick<UserWithPasswordType, 'email' | 'password'>;

export type UserAuthType = {
  accessToken: string;
  user: UserType;
};

export type UserStateType =
  | { status: 'pending' }
  | { status: 'guest' }
  | ({ status: 'logged' } & UserType);

  