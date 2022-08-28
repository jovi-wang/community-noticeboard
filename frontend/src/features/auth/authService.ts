import axios from 'axios';
import { IUser } from '../../types/interfaces';

const API_URL = '/api/users';

const register = async (user: IUser): Promise<IUser> => {
  const { data } = await axios.post(API_URL, user);
  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  return data as IUser;
};

const login = async (user: IUser): Promise<IUser> => {
  const { data } = await axios.post(`${API_URL}/login`, user);
  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  return data as IUser;
};
const logout = () => localStorage.removeItem('user');

const authService = {
  register,
  login,
  logout,
};

export default authService;
