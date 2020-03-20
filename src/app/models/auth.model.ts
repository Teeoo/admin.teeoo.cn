export interface User {
  id: string;
  order: number;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  avatar: string;
  url?: any;
  screenName: string;
  exInfo?: any;
  lastIp: string;
  lastTime: Date;
}

export interface SignIn {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  User: User;
}

export interface RootObject {
  SignIn: SignIn;
}
