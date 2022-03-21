import URIAuth, { URIWithToken } from "./ApiAuth";
import { URIWithTokenEvents } from "./APIEvents";

export const loginAPI = new URIAuth();
export const authMe = new URIWithToken("auth");
export const eventsWithToken = new URIWithTokenEvents();
