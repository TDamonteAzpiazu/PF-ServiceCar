const ContactoForm: React.FC = () => {
    return (
      <section className="p-6 bg-black rounded-xl text-white">
        <div>
          <h4 className="text-sm text-gray-500 mb-4">
            Comparte tus sugerencias o inquietudes para que podamos mejorar nuestros servicios.
          </h4>
          <h2 className="text-xl font-bold mb-4">Déjanos tu comentario</h2>
          <form action="">
            <div className="mb-4">
              <span>Nombre</span>
              <input type="text" name="name" placeholder="Tu nombre" className="bg-black w-full p-2 border rounded-xl" />
            </div>
            <div className="mb-4">
              <span>Email</span>
              <input type="email" name="email" placeholder="Email" className="bg-black w-full p-2 border rounded-xl" />
            </div>
            <div className="mb-4">
              <span>Asunto</span>
              <input type="text" name="asunto" placeholder="Asunto" className="bg-black w-full p-2 border rounded-xl" />
            </div>
            <textarea name="message" cols={15} rows={5} placeholder="Mensaje" className="bg-black w-full p-2 border rounded-xl mb-1"></textarea>
            <button type="submit" className="custom-button">Enviar Mensaje</button>
          </form>
        </div>
      </section>
    );
  };
  
  export default ContactoForm;
  