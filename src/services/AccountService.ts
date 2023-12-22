import { UserGetByToken } from './../model/accountModel';
import api from './api';

const BASE_URL_ACCOUNT = 'https://localhost:7032/api/account/';

export function GetByToken() {
  return api.get(BASE_URL_ACCOUNT + 'getByToken');
}
