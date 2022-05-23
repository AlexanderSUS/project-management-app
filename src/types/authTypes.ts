export type AuthState = {
  login: string;
  userId: string;
  userName: string;
};

export type JwtData = {
  userId: string;
  login: string;
  iat: number;
};

// Auth form types
export type SignUpFormInput = {
  name: string;
  login: string;
  password: string;
};

export type SignInFormInput = {
  login: string;
  password: string;
};

export type AuthInputFeldProps = {
  id: string;
  type: string;
  placeholder: string;
  autoComplete: string;
};
