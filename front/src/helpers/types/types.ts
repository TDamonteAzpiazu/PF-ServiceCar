
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

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}