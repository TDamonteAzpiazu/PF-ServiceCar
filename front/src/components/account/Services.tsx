import React from 'react';
import ServiceCall from './serviciosComponentes/ServiceCall';
import ServiceAddDelete from './serviciosComponentes/ServiceAdd';

const Services: React.FC = () => {
  return (
    <section className="py-3 w-full text-custom-white">
      <h1 className="text-3xl mb-4">Servicios Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <ServiceCall />
        </div>
        <div className="col-span-1">
          <ServiceAddDelete /> 
        </div>
      </div>
    </section>
  );
};

export default Services;
