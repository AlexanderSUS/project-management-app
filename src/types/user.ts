export interface User {
  login: string;
  password: string;
}

export interface NewUser {
  name: string;
  login: string;
  password: string;
}

export interface CurrentUser {
  login: string | null;
  userdId: string | null;
}
