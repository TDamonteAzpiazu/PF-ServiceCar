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
  sucursal?: string;
}

export interface IAppointmentUser {
  id: string;
  date: string;
  time: string;
  status: string;
  pago: string;
  user: IUser;
  sucursal: ISucursales;
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
  sucursales: string[];
  image: string;
  price: number;
  status: string;
  vehiculo: string;
}

export interface IServiceDto {
  type: string;
  description: string;
  price: number;
  vehiculo: string;
  sucursales: string[] | null;
}

export interface IOpinion {
  estrellas: number;
  nombre: string;
  ocupacion: string;
  opinion: string;
  icono: string;
}

export interface IOpinionUser {
  id: string;
  rating: number;
  user: any;
  occupation: string;
  comment: string;
  status: string;
  createdAt: string;
  service: IService;
}

export interface ISucursales {
  id: string;
  name: string;
  address: string;
  latitud: string;
  longitud: string;
  details: string;
  services?: IService[];
  status: string;
}

export interface ISucursalesDto {
  name: string;
  address: string;
  latitud: string;
  longitud: string;
  details: string;
}

export interface IGraphicGral {
  data: any[];
  labels: string[];
}

export interface IGraphicUsers {
  data: any[];
  labels: string[];
  label: string;
}
