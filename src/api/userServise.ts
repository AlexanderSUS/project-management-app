import { AxiosResponse } from 'axios';
import api from '.';
import { API_URL } from '../constants/authorization';
import Endpoint from '../constants/endpoints';
import { SignUpFormInput } from '../types/authTypes';
import { NewUser, UserData } from '../types/user';

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<NewUser[]>> {
    return api.get<NewUser[]>('/users');
  }

  static async getUserData(id: string): Promise<AxiosResponse<UserData>> {
    return api.get(`${API_URL}${Endpoint.USERS}/${id}`);
  }

  static async updateUserData(
    id: string,
    userData: SignUpFormInput,
  ): Promise<AxiosResponse<SignUpFormInput>> {
    return api.put(`${API_URL}${Endpoint.USERS}/${id}`, userData);
  }
}
