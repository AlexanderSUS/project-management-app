import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../constants/authorization';
import Endpoint from '../constants/endpoints';
import { NewUser, User } from '../types/user';

export default class AuthService {
  static async signin<SingInResponse>(user: User): Promise<AxiosResponse<SingInResponse>> {
    return axios.post(API_URL + Endpoint.SIGN_IN, user);
  }

  static async signup<SingUpResponse>(
    newUser: NewUser,
  ): Promise<AxiosResponse<SingUpResponse>> {
    return axios.post(API_URL + Endpoint.SIGN_UP, newUser);
  }
}
