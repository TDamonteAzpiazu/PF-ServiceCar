import { FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const ContactoInfo = () => {
  return (
    <section className="p-6 bg-black rounded-xl text-white">
      <p className="text-sm text-gray-500 mb-8">
        In tempus nisl turpis, at ultricies dui eleifend a. Quisque et quam vel nunc consectetur pharetra euismod et elit. 
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex items-center transform transition-transform duration-300 hover:scale-105 hover:translate-y-1">
          <FaPhone size={30} className="mr-4 text-red-600" />
          <div>
            <h4 className="font-bold">Phone Number</h4>
            <p>+62 82 4032 567</p>
          </div>
        </div>

        <div className="flex items-center transform transition-transform duration-300 hover:scale-105 hover:translate-y-1">
          <FaEnvelope size={30} className="mr-4 text-red-600" />
          <div>
            <h4 className="font-bold">Email Address</h4>
            <p>Example@Email.com</p>
          </div>
        </div>

        <div className="flex items-center transform transition-transform duration-300 hover:scale-105 hover:translate-y-1">
          <FaWhatsapp size={30} className="mr-4 text-red-600" />
          <div>
            <h4 className="font-bold">Whatsapp</h4>
            <p>082 245-7253</p>
          </div>
        </div>

        <div className="flex items-center transform transition-transform duration-300 hover:scale-105 hover:translate-y-1">
          <FaMapMarkerAlt size={30} className="mr-4 text-red-600" />
          <div>
            <h4 className="font-bold">Our Office</h4>
            <p>2443 Oak Ridge Omaha, CA 45065</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26278.902748740837!2d-58.44585683138387!3d-34.60756800518426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccafeaed4d1f1%3A0xe4f0a7995126d209!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1646009736347!5m2!1sen!2sus"
          width="300"
          height="350"
          loading="lazy"
          className="border-0 w-full"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactoInfo;