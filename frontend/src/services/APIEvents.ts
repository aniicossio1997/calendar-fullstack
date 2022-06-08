import axios from "axios";
import { IEventPUT } from "../ts/interfaces/ICalendar";
import { IEventSave } from "../ts/interfaces/IEvents";
import { baseURI, token } from "./ApiAuth";

export class URIWithTokenEvents {
  httpClient = axios.create({
    baseURL: `${baseURI}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  _endpoint;

  constructor() {
    this._endpoint = "users";
    return this;
  }
  get(idUser: string, idEvent: string) {
    //method get
    return this.httpClient.get(`${this._endpoint}/${idUser}/events/${idEvent}`);
  }
  getAll<T>(idUser: string) {
    //method get
    return this.httpClient.get<T>(`${this._endpoint}/${idUser}/events`);
  }
  post<T>(idUser: string, dataEvent: IEventSave) {
    return this.httpClient.post<T>(
      `${this._endpoint}/${idUser}/events`,
      dataEvent
    );
  }
  put<T>(idUser: string, idEvent: string, dataEvent: IEventPUT) {
    return this.httpClient.put<T>(
      `${this._endpoint}/${idUser}/events/${idEvent}`,
      dataEvent
    );
  }
  delete<T>(idUser: string, idEvent: string) {
    //method delete
    return this.httpClient.delete<T>(
      `${this._endpoint}/${idUser}/events/${idEvent}`
    );
  }
}
