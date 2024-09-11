import React, { useRef } from "react";
import { IService } from "@/helpers/types/types";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import EditFormService from "./EditFormService";

interface EditServiceProps {
  FetchServices: () => Promise<IService[]>;
  setViewEditService: React.Dispatch<React.SetStateAction<boolean>>;
  viewEditService: boolean;
  service: IService;
}

const EditService: React.FC<EditServiceProps> = ({
  FetchServices,
  setViewEditService,
  viewEditService,
  service,
}) => {
  // Crear una referencia para el contenedor del contenido del modal
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Manejar clics en el overlay
  const handleOverlayClick = (event: React.MouseEvent) => {
    // Cerrar el modal solo si el clic es fuera del contenedor del modal
    if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
      setViewEditService(false);
    }
  };

  return (
    <CSSTransition
      in={viewEditService}
      timeout={200}
      classNames="modal"
      unmountOnExit
    >
      <div className="modal-overlay z-50" onClick={handleOverlayClick}>
        <div
          className="modal-content-sucursal"
          style={{
            boxShadow: "rgba(100,100,111,0.2) 0px 7px 29px 0px",
            maxHeight: "85vh",
          }}
          ref={modalContentRef}
        >
          <div className="flex items-center mb-5 pb-5 border-b border-custom-grey w-full">
            <h3 className="font-semibold text-2xl">Editar Servicio</h3>
          </div>
          <button
            onClick={() => setViewEditService(false)}
            className="absolute top-5 right-5 py-1 px-1.5 transition-all border-2 border-custom-red bg-transparent rounded-md hover:bg-custom-red text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
          <EditFormService
            service={service}
            FetchServices={FetchServices}
            setViewEditService={setViewEditService}
          />
        </div>
      </div>
    </CSSTransition>
  );
};

export default EditService;
