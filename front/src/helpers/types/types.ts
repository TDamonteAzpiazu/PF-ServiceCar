
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

export interface UserSessionProps {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
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
  phone: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string
  password2: string
  profileImg: any
}
export interface handleProp {
  values: IUserRegister;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  url: string;
  titleSwal: string;
  textSwal: string;
  textError: string;
}
