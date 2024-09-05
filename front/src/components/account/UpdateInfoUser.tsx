"use client";
import { IUser } from "@/helpers/types/types";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import "../../styles/modalReservations.css";
import FormUpdateUser from "./FormUpdateUser";

const UpdateInfoUser: React.FC<{
  dataUser: IUser;
  viewUpdateUser: boolean;
  setViewUpdateUser: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ dataUser, setViewUpdateUser, viewUpdateUser }) => {
  return (
    <CSSTransition
      in={viewUpdateUser}
      timeout={200}
      classNames="modal"
      unmountOnExit
    >
      <div className="modal-overlay z-50">
        <div
          className="modal-content"
          style={{
            boxShadow: "rgba(100,100,111,0.2) 0px 7px 29px 0px",
            maxHeight: "85vh",
          }}
        >
          <div className="flex flex-col gap-1 items-center mb-5 pb-5 border-b border-custom-grey w-full">
            <h3 className="font-medium text-2xl text-custom-white">
              Editar usuario
            </h3>
            <p className="text-custom-grey font-light text-sm">Puede actualizar los datos que desea</p>
          </div>
          <button
            onClick={() => setViewUpdateUser(false)}
            className="absolute top-5 right-5 py-1 px-1.5 transition-all border-2 border-custom-red bg-transparent rounded-md hover:bg-custom-red text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
          <div>
            <FormUpdateUser
              dataUser={dataUser}
              setViewUpdateUser={setViewUpdateUser}
              viewUpdateUser={viewUpdateUser}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default UpdateInfoUser;
