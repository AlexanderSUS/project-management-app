export interface SignUpResponse {
  name: string;
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface ErrorResponseData {
  message: string;
  statusCode: number;
}

export type ValidationErrors = {
  [key: string]: any;
};

export type GetUserResponse = {
  id: string;
  name: string;
  login: string;
};
