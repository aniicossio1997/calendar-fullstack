import axios from "axios";
import { IUserLogin, IUserRegister } from "../ts/interfaces/IUser";
import { LocalStorageService } from "./ServiceLocalStore";

export const baseURI = process.env.REACT_APP_API_URL;
export let token = LocalStorageService.getItem<string>("token");
export default class URIAuth {
  /*
  api/auth
  */
  httpClient = axios.create({
    baseURL: `${baseURI}`,
  });
  _endpoint;

  constructor() {
    this._endpoint = "auth";
    return this;
  }
  login(data: IUserLogin) {
    /*
    method post
  api/auth/login
  */ return this.httpClient.post(`${this._endpoint}/login`, data);
  }
  register<T>(data: IUserRegister) {
    /*
    method post
  api/users
  */ return this.httpClient.post<T>(`/users`, data);
  }
  me() {
    //method post api/auth/me
    let token = LocalStorageService.getItem<string>("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return this.httpClient.post(`${this._endpoint}/me`, null, config);
  }
}

export class URIWithToken {
  httpClient = axios.create({
    baseURL: `${baseURI}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  _endpoint;

  constructor(endpoint: string) {
    this._endpoint = endpoint;
    return this;
  }
  me() {
    //method get
    return this.httpClient.post(`${this._endpoint}/me`);
  }
}
