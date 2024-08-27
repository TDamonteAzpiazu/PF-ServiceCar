import { Service } from "../services/services.entity";

export const predefinedServices: Omit<Service, 'id' | 'status'>[] = [
    {
        type: 'Cambio de Aceite',
        description: 'Cambio completo de aceite y filtro.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://res.cloudinary.com/dwyboceie/image/upload/v1724721166/Aceite_asog8l.jpg',
        price: 50,
    },
    {
        type: 'Rotación de Neumáticos',
        description: 'Rotación de neumáticos para asegurar un desgaste uniforme.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://res.cloudinary.com/dwyboceie/image/upload/v1724721167/neumaticos_uk2sg7.webp',
        price: 30,
    },
    {
        type: 'Inspección de Frenos',
        description: 'Inspección y mantenimiento exhaustivo de frenos.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://res.cloudinary.com/dwyboceie/image/upload/v1724721167/frenos_nbmlix.jpg',
        price: 70,
    },
    {
        type: 'Cambio de Bujías',
        description: 'Sustitución de bujías para un encendido más eficiente.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://res.cloudinary.com/dwyboceie/image/upload/v1724721167/bujias_vu96su.jpg',
        price: 40,
    },
    {
        type: 'Alineación y Balanceo',
        description: 'Ajuste de alineación y balanceo para mejorar la estabilidad del vehículo.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://res.cloudinary.com/dwyboceie/image/upload/v1724721167/alineacion_kjz1dt.jpg',
        price: 60,
    },
    {
        type: 'Cambio de Filtro de Aire',
        description: 'Reemplazo del filtro de aire para un mejor rendimiento del motor.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://res.cloudinary.com/dwyboceie/image/upload/v1724721167/filtro_k6bvai.jpg',
        price: 25,
    },
    {
        type: 'Revisión de Suspensión',
        description: 'Inspección completa del sistema de suspensión para asegurar una conducción suave.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://res.cloudinary.com/dwyboceie/image/upload/v1724721166/suspension_rdljfr.jpg',
        price: 80,
    },
    {
        type: 'Cambio de Batería',
        description: 'Sustitución de batería para garantizar el correcto funcionamiento eléctrico del vehículo.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://res.cloudinary.com/dwyboceie/image/upload/v1724721166/bateria_i8xblb.jpg',
        price: 100,
    },
    {
        type: 'Limpieza de Inyectores',
        description: 'Limpieza profesional de inyectores para mejorar la eficiencia del combustible.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://res.cloudinary.com/dwyboceie/image/upload/v1724721166/inyectores_ndmmca.jpg',
        price: 60,
    },
    {
        type: 'Inspección Completa',
        description: 'Revisión exhaustiva de todos los sistemas del vehículo.',
        location: 'Calle Principal 123, Ciudad',
        image: 'https://res.cloudinary.com/dwyboceie/image/upload/v1724721166/inspeccion_guh8ol.jpg',
        price: 200,
    },
];
