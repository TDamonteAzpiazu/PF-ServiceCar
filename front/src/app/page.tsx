import Banner from "@/components/landing/Banner";
import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const Landing = () => {
  return (
    <main>
      <Banner />
      <section>
        <p>Trabajo y eficiencia</p>
        <h2>GARAGEJS</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
          sint harum illo
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad dolor
          sunt natus facilis maxime minima quia praesentium, numquam cumque
          fugiat cum optio accusamus corrupti odio unde quam ea fuga nulla.
        </p>
        <div className="flex">
          <div className="relative flex w-60 bg-custom-grey items-center">
            <input type="text" placeholder="Ingrese su localidad" className="bg-transparent outline-none"/>
            <span className="absolute right-1">
              <IoSearchSharp />
            </span>
          </div>
          <button>Buscar</button>
        </div>
      </section>
      <section>

      </section>
    </main>
  );
};

export default Landing;
