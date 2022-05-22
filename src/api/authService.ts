import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../constants/authorization';
import Endpoint from '../constants/endpoints';
import { NewUser, User } from '../types/user';
import { SignInResponse, SignUpResponse } from '../types/response';

export default class AuthService {
  static signin(user: User): Promise<AxiosResponse<SignInResponse>> {
    return axios.post(API_URL + Endpoint.SIGN_IN, user);
  }

  static async signup(newUser: NewUser): Promise<AxiosResponse<SignUpResponse>> {
    return axios.post(API_URL + Endpoint.SIGN_UP, newUser);
  }
}
