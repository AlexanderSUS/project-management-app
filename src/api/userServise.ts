import { AxiosResponse } from 'axios';
import api from '.';
import { NewUser } from '../types/user';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<NewUser[]>> {
    return api.get<NewUser[]>('/users');
  }
}
