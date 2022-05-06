import { AxiosResponse } from 'axios';
import api from '../api';
import Endpoint from '../app/constants/endpoints';
import { NewUser, User } from '../types/user';

export default class AuthService {
  static async signin<SingInResponse>(user: User): Promise<AxiosResponse<SingInResponse>> {
    return api.post(Endpoint.SIGN_IN, user);
  }

  static async signup<SingUpResponse>(
    newUser: NewUser,
  ): Promise<AxiosResponse<SingUpResponse>> {
    return api.post(Endpoint.SIGN_UP, newUser);
  }
}
