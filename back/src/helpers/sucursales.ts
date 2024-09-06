import { Sucursal } from "../sucursales/sucursales.entity";

export const predefinedSucursales: Partial<Sucursal>[] = [
  {
    name: "Córdoba Centro",
    address: "Av. Colón 1234, Córdoba, Argentina",
    latitud: "-31.4135",
    longitud: "-64.1811",
    details:
      "Esta sucursal cuenta con un equipo especializado en mecánica rápida y servicios de mantenimiento preventivo. Ofrecemos servicios de cambio de aceite, revisión de frenos, y más.",
  },
  {
    name: "Buenos Aires Norte",
    address: "Av. Libertador 5678, Buenos Aires, Argentina",
    latitud: "-34.5679",
    longitud: "-58.4434",
    details:
      "En Buenos Aires Norte ofrecemos servicios completos de reparación, desde mecánica ligera hasta reparaciones mayores. Además, contamos con un taller de pintura automotriz.",
  },
  {
    name: "Mendoza Oeste",
    address: "Calle Las Heras 910, Mendoza, Argentina",
    latitud: "-32.8904",
    longitud: "-68.8282",
    details:
      "La sucursal de Mendoza Oeste se especializa en alineación y balanceo, además de ofrecer diagnóstico computarizado para resolver problemas eléctricos y electrónicos.",
  },
];
