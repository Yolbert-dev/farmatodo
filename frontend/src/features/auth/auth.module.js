import ky from "ky";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import { atom } from "nanostores";

export const user = atom(null);

const login = async ({id_codigo, passwordhash}) => {
  const data = await ky.post(`${BACK_ENDPOINT}/api/auth/login`, {
    json: {id_codigo, passwordhash},
    credentials: 'include'
  });
  user.set(data);
}

const getLoggedUser = async () => {
  const data = await ky.get(`${BACK_ENDPOINT}/api/auth/user`, {credentials: 'include'}).json();
  user.set(data);
  return data;
}

const logoutUser = async () => {
  await ky.get(`${BACK_ENDPOINT}/api/auth/logout`, {credentials: 'include'});
}

const AuthModule = { login, getLoggedUser, logoutUser };
export default AuthModule;