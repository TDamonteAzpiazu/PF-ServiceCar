import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdEdit } from 'react-icons/md'

const InfoAccount:React.FC = () => {
  return (
    <section>
    <div className='bg-black bg-opacity-80 flex'>
      <div className="relative">
        <Image alt="" src="/user2.png" height={100} width={100} />
        <button className="absolute">
          <MdEdit />
        </button>
      </div>
      <div>
        <h2>Agustin Gerardo Haag</h2>
        <p>agustin-haag@hotmail.com</p>
      </div>
    </div>
    <div>
      <div>
        <div>
          <span>Nombre:</span>
          <p>Agustin Gerardo</p>
        </div>
        <div>
          <span>Apellido:</span>
          <p>Haag Letterucci</p>
        </div>
      </div>
      <div>
        <div>
          <span>Teléfono:</span>
          <p>+22222333344</p>
        </div>
        <div>
          <span>Dirección:</span>
          <p>Avenida San martin 209</p>
        </div>
      </div>
    </div>
    <div>
      <Link href="/edit">Editar perfil</Link>
    </div>
  </section>
  )
}

export default InfoAccount