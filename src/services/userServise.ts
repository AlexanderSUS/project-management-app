import { AxiosResponse } from 'axios';
import api from '../api';
import { NewUser } from '../types/user';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<NewUser[]>> {
    return api.get<NewUser[]>('/users');
  }
}
