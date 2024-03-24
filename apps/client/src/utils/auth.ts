import { ISession } from "../types/ISession";
import { PersistSession } from "./persistAuth";

const receivedSession = PersistSession.getSession();

export const auth: Auth = {
  status: receivedSession ? "loggedIn" : "loggedOut",
  user: receivedSession,
  login: async (user: ISession) => {
    PersistSession.updateSession(user);

    auth.status = "loggedIn";
    auth.user = user;
  },
  logout: () => {
    PersistSession.deleteSession();

    auth.status = "loggedOut";
    auth.user = undefined;
  },
};

export type Auth = {
  login: (user: ISession) => Promise<void>;
  logout: () => void;
  status: "loggedOut" | "loggedIn";
  user?: ISession;
};
