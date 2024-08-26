import { Service } from "../services/services.entity";

export const predefinedServices: Omit<Service, 'id' | 'status'>[] = [
    {
        type: 'Cambio de Aceite',
        description: 'Cambio completo de aceite y filtro.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://example.com/images/cambio-aceite.jpg',
        price: 50,
    },
    {
        type: 'Rotación de Neumáticos',
        description: 'Rotación de neumáticos para asegurar un desgaste uniforme.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://example.com/images/rotacion-neumaticos.jpg',
        price: 30,
    },
    {
        type: 'Inspección de Frenos',
        description: 'Inspección y mantenimiento exhaustivo de frenos.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://example.com/images/inspeccion-frenos.jpg',
        price: 70,
    },
];