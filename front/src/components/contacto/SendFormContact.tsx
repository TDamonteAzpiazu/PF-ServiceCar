import React from 'react'

interface SendFormContactProps {
    setFormSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  }

const SendFormContact: React.FC<SendFormContactProps> = ({ setFormSubmit }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-64">
    <h3 className="text-xl italic">
      Muchas gracias por comunicarse con nosotros!
    </h3>
    <p className="my-4">En breve nos pondremos en contacto.</p>
    <div className="flex justify-end w-2/3 mb-5 cont-btn">
      <button
        className=" bg-none text-custom-red border border-custom-red rounded-xl md:text-base md:py-2 md:px-5 hover:cursor-pointer hover:bg-custom-red hover:text-custom-white text-sm py-1.5 px-4"
        onClick={() => {
          setFormSubmit(false);
        }}
      >
        Volver
      </button>
    </div>
  </div>
  )
}

export default SendFormContact