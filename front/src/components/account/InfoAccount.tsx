"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "@/helpers/types/types";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import UpdateInfoUser from "./UpdateInfoUser";
import { setUserData } from "@/redux/userSlice";

const InfoAccount: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [viewUpdateUser, setViewUpdateUser] = useState<boolean>(false);
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const url = process.env.NEXT_PUBLIC_URL;

  const toggleMenu = () => {
    setViewUpdateUser(!viewUpdateUser);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);

      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      try {
        const response = await fetch(
          `${url}/cloudinary/userImage/${dataUser.id}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Error uploading file");
        }
        const result = await response.json();
       
        if (result) {
          dispatch(setUserData(result));
          
          setSelectedFile(null);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <section className="md:w-3/4 w-full mt-2 mr-4">
      {dataUser && (
        <>
          <div className="bg-black py-6 pl-3 bg-opacity-70 flex gap-4 rounded items-center text-custom-white">
            <div className="relative">
              <Image
                alt="User Image"
                src={dataUser.image || "/userPerfil2.png"}
                height={160}
                width={160}
                className="sm:w-36 w-28 rounded-full min-h-36 min-w-32"
                
                key={dataUser.image}
              />
              <label
                htmlFor="file-input"
                className="absolute bottom-5 right-1 border-2 border-custom-red font-semibold sm:text-2xl text-base rounded-full p-1 bg-custom-red text-custom-white hover:bg-custom-white hover:text-custom-red cursor-pointer"
              >
                <MdEdit />
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold sm:text-3xl text-xl">
                {dataUser.name}
              </h2>
              <p className="font-light sm:text-base text-xs">
                {dataUser.email}
              </p>
            </div>
          </div>
          <div className="text-custom-white flex flex-col sm:gap-5 w-full">
            <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 text-start pt-3 pb-5">
              <div className="w-1/2">
                <span className="font-light text-custom-grey">Nombre:</span>
                <p>{dataUser.name}</p>
              </div>
              <div className="w-1/2">
                <span className="font-light text-custom-grey">Email:</span>
                <p>{dataUser.email}</p>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 text-start">
              <div className="w-1/2">
                <span className="font-light text-custom-grey">
                  Estado de cuenta:
                </span>
                <p className="text-green-600 capitalize">{dataUser.status}</p>
              </div>
              <div className="w-1/2">
                <span className="font-light text-custom-grey">Dirección:</span>
                <p>{dataUser.address || "Av. San martin 123"}</p>
              </div>
            </div>
          </div>
          {viewUpdateUser && (
            <div
              className="fixed inset-0 bg-black bg-opacity-55 z-40"
              onClick={toggleMenu}
            ></div>
          )}
          <div className="flex justify-center my-7">
            <button
              onClick={() => setViewUpdateUser(true)}
              className="bg-custom-red rounded font-semibold py-2 px-6 hover:bg-red-600 text-custom-white"
            >
              Editar perfil
            </button>
          </div>
        </>
      )}

      <UpdateInfoUser
        dataUser={dataUser}
        setViewUpdateUser={setViewUpdateUser}
        viewUpdateUser={viewUpdateUser}
      />
    </section>
  );
};

export default InfoAccount;
