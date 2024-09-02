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

export interface TokenProps {
  token: string;
}

export interface ContextProps {
  token: TokenProps | null;
  setToken: (token: TokenProps | null) => void;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  image: string;
  role: string;
  status: string;
  appointments?: []; 
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

export interface IAppointment {
  user: string;
  service: string[]; 
  date: string;
  time: string;
}

export interface IAppointmentUser {
  id: string;
  date: string;
  time: string;
  status: string;
  user: IUser;
  service: IService[];
}

export interface handlePropAppointment {
  values: IAppointment;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  url: string;
  token: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IService {
  id: string;
  type: string;
  description: string;
  image: string;
  price: number;
  vehiculo: string;
  sucursales: ISucursales[];
}
export interface IOpinion {
  estrellas: number;
  nombre: string;
  ocupacion: string;
  opinion: string;
  icono: string;
}

export interface ISucursales  {
  id: string;
  name: string;
  latitud: string;
  longitud: string;
  details: string
  services: IService[]
}