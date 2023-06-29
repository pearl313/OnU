interface UserStore {
  token?: string;
  user?: IUser;
  initialize: () => void;
  setUser: (user: IUser) => void;
  resetUser: () => void;
}
