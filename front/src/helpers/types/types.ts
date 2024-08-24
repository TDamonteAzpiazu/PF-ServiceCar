export interface BannerProps {
  img: string;
  text: string;
  title: string;
}

export interface FormValues {
  name: string;
  email: string;
  asunto: string;
  message: string;
}

export interface UserSessionProps {
  // id: number;
  // name: string;
  // email: string;
  // address: string;

  token: string;
}

export interface ContextProps {
  dataUser: UserSessionProps | null;
  setDataUser: (dataUser: UserSessionProps | null) => void;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  address: string;
}

export interface IUserRegister {
  name: string;
  surname: string;
  email: string;
  address: string;
  password: string;
  repeatPassword: string;
}
export interface IUserSend {
  name: string;
  email: string;
  address: string;
  password: string;
  repeatPassword: string;
}
export interface handleProp {
  values: IUserSend | IUserLogin;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  url: string;
  titleSwal: string;
  textSwal: string;
  textError: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
