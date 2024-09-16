import { ISucursales } from "@/helpers/types/types";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import FormCreateSucursal from "./FormCreateSucursal";

const CreateSucursal: React.FC<{
  setViewCreateSucursal: React.Dispatch<React.SetStateAction<boolean>>;
  viewCreateSucursal: boolean;
  FetchSucursales: () => Promise<ISucursales[]>;
}> = ({ setViewCreateSucursal, viewCreateSucursal, FetchSucursales }) => {
  return (
    <CSSTransition
      in={viewCreateSucursal}
      timeout={200}
      classNames="modal"
      unmountOnExit
    >
      <div className="modal-overlay z-50">
        <div
          className="modal-content-sucursal"
          style={{
            boxShadow: "rgba(100,100,111,0.2) 0px 7px 29px 0px",
            maxHeight: "85vh",
          }}
        >
          <div className="flex items-center mb-5 pb-5 border-b border-custom-grey w-full">
            <h3 className="font-semibold text-2xl">Crear sucursal</h3>
          </div>
          <button
            onClick={() => setViewCreateSucursal(false)}
            className="absolute top-5 right-5 py-1 px-1.5 transition-all border-2 border-custom-red bg-transparent rounded-md hover:bg-custom-red text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>

          <FormCreateSucursal
            FetchSucursales={FetchSucursales}
            setViewCreateSucursal={setViewCreateSucursal}
          />
        </div>
      </div>
    </CSSTransition>
  );
};

export default CreateSucursal;
