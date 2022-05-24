import { AxiosResponse } from 'axios';
import api from '.';
import { API_URL } from '../constants/authorization';
import Endpoint from '../constants/endpoints';
import { SignUpFormInput } from '../types/authTypes';
import { RemoveUserResponse } from '../types/response';
import { NewUser, UserData } from '../types/user';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<NewUser[]>> {
    return api.get<NewUser[]>('/users');
  }

  static getUserData(id: string): Promise<AxiosResponse<UserData>> {
    return api.get(`${API_URL}${Endpoint.USERS}/${id}`);
  }

  static updateUserData(
    id: string,
    userData: SignUpFormInput,
  ): Promise<AxiosResponse<UserData>> {
    return api.put(`${API_URL}${Endpoint.USERS}/${id}`, userData);
  }

  static removeUser(userId: string): Promise<AxiosResponse<RemoveUserResponse>> {
    return api.delete(`${Endpoint.USERS}/${userId}`);
  }
}
