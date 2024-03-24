import { ISession } from "../types/ISession";

const sessionLSName = "storedSessionData";

export const PersistSession = {
  getSession(): ISession | undefined {
    const val = localStorage.getItem(sessionLSName);
    return val ? JSON.parse(val) : undefined;
  },
  updateSession(session: ISession) {
    localStorage.setItem(sessionLSName, JSON.stringify(session));
  },
  deleteSession() {
    localStorage.removeItem(sessionLSName);
  },
};
