"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  handleUpdate: () => void; // Nueva prop para actualizar los servicios
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, isOpen, onClose, serviceId, handleUpdate }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const url = process.env.NEXT_PUBLIC_URL;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(`${url}/cloudinary/serviceImage/${serviceId}`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error uploading file");
        }

        const result = await response.json();
        if (result) {
          Swal.fire({
            title: "¡Imagen actualizada!",
            text: "La imagen del servicio se ha cambiado correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setSelectedFile(null);
          handleUpdate(); 
          onClose(); // Cerrar el modal
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cambiar la imagen.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor selecciona una imagen antes de aceptar.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-custom-grey p-6 rounded-lg max-w-md w-full text-center">
        <img src={imageUrl} alt="Service" className="w-full h-auto mb-4" />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        
        <button onClick={handleFileUpload} className="bg-blue-500 text-white py-2 px-4 ml-4 rounded mt-4 hover:bg-custom-blue">
          Aceptar
        </button>

        <button onClick={onClose} className="bg-red-600 text-white py-2 px-4 ml-4 rounded mt-4 hover:bg-custom-red">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
