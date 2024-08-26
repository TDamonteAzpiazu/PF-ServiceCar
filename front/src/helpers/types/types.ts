export interface BannerProps {
<<<<<<< HEAD
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
=======
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

>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
  token: string;
}

export interface ContextProps {
  dataUser: UserSessionProps | null;
  setDataUser: (dataUser: UserSessionProps | null) => void;
}

<<<<<<< HEAD
export interface User {
=======
export interface IUser {
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
  id: number;
  name: string;
  email: string;
  address: string;
<<<<<<< HEAD
  phone: string;
}
=======
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
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
