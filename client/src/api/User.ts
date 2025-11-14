import axios from 'axios';
import { tokenParser } from '../Global/tokenParser';

const BASE_ADDRESS = `${process.env.REACT_APP_API_URL ?? ''}/user`;

export type CreateUserProps = {
  email: string;
  psw: string;
  confPsw: string;
  displayName: string;
};

export type LoginCredsProps = {
  email: string;
  psw: string;
};

const getToken = () => sessionStorage.getItem('accessToken');

export const createUser = (newUser: CreateUserProps) =>
  axios.post(`${BASE_ADDRESS}/create-user`, newUser).then((res) => res);

export const loginPost = (userCreds: LoginCredsProps) =>
  axios.post(`${BASE_ADDRESS}/login`, userCreds).then((res) => res);

export const getUserDisplayName = () => tokenParser(getToken())?.displayName ?? '';

export const updateUserDisplayName = (displayName: string) =>
  axios.post(
    `${BASE_ADDRESS}/update-displayname`,
    { displayName },
    { headers: { authorization: getToken() } }
  );
