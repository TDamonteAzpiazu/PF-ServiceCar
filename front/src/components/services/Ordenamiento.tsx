interface IOrdenamientoProps {
  ordenPrecioAsc: () => void;
  ordenPrecioDesc: () => void;
}

const OrdenOpciones: React.FC<IOrdenamientoProps> = ({
  ordenPrecioAsc,
  ordenPrecioDesc,
}) => {
  return (
    <div className="absolute bg-white text-black rounded shadow-lg py-2 mt-2 z-10">
      <button
        className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-300 font-medium  hover:text-custom-red"
        onClick={ordenPrecioAsc}
      >
        De menor precio a mayor
      </button>
      <button
        className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-300 font-medium  hover:text-custom-red"
        onClick={ordenPrecioDesc}
      >
        De mayor precio a menor
      </button>
    </div>
  );
};

export default OrdenOpciones;
