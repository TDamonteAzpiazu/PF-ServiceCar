import ServiceDetail from "@/components/services/ServiceDetail";
import React from "react";

const ServicesDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  return (
    <main>
      <h2>detalles</h2>
      <ServiceDetail id={id} />
    </main>
  );
};

export default ServicesDetail;
