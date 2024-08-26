export interface BannerProps {
    img: string;
    text: string;
    title: string;
  }

export interface FormValues {
  name: string,
  email: string,
  asunto: string,
  message: string,
}

export interface TokenProps {
  token: string;
}

export interface ContextProps {
  token: TokenProps | null;
  setToken: (token: TokenProps | null) => void;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  image: string;
  role: string;
  status: string;
  appointments: [];
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
