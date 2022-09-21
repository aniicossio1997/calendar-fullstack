import URIAuth, { URIWithToken } from "./ApiAuth";
import { URIWithTokenEvents } from "./APIEvents";

export const loginAPI = new URIAuth();
export const auth = new URIAuth();
export const eventsWithToken = new URIWithTokenEvents();
