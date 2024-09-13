import React, { useRef } from "react";
import { IService } from "@/helpers/types/types";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import EditFormService from "./EditFormService";

interface EditServiceProps {
  setViewEditService: React.Dispatch<React.SetStateAction<boolean>>;
  viewEditService: boolean;
  service: IService;
  handleUpdate: () => void; 
}

const EditService: React.FC<EditServiceProps> = ({
  setViewEditService,
  viewEditService,
  service,
  handleUpdate,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent) => {
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
      <div className="modal-overlay z-50 flex justify-center items-center" onClick={handleOverlayClick}>
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
            setViewEditService={setViewEditService}
            handleUpdate={handleUpdate} // Pasar la función de actualización
          />
        </div>
      </div>
    </CSSTransition>
  );
};

export default EditService;
