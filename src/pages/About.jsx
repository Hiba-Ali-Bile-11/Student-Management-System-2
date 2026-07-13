import Hiba from "../assets/images/Hiba.jpg";
import Hafsa from "../assets/images/Hafsa.jpg";
import Shukri from "../assets/images/Shukri.jpg";
import Caisha from "../assets/images/Aisho.jpg";
import Sumayah from "../assets/images/Sumayah.jpg";
import Fatimah from "../assets/images/Fatimo.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";

function About() {
  return (
    <>

    <Header/>
    <section className="py-16 bg-gray-50">

       <div className="bg-white rounded-[30px] overflow-hidden shadow-xl border border-gray-100 hover:-translate-y-2 hover:shadow-cyan-300/40 transition-all duration-300">

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Our Students
          </h2>

          <p className="text-gray-500 mt-3">
            Meet our talented computer science students.
          </p>
        </div>


        {/* Students Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">


          <div className="bg-white h-{200px} shadow p-5 text-center">
            <img
              src={Hiba}
              className="w-full h-80 object-cover"
            />

            <h3 className="text-xl font-bold mt-4">
              Hiba Ali
            </h3>

            <p className="text-gray-600">
              Computer Science
            </p>

            <p className="text-gray-500">
              Hiba@gmail.com
            </p>
          </div>



          <div className="bg-white h-{200px} rounded-xl shadow p-5 text-center">
            <img
              src={Hafsa}
              className="w-full h-80 object-cover"
            />

            <h3 className="text-xl font-bold mt-4">
              Hafsa Mahamutt
            </h3>

            <p className="text-gray-600">
              Computer Science
            </p>

            <p className="text-gray-500">
              Hafsa@gmail.com
            </p>
          </div>



          <div className="bg-white h-{200px} rounded-xl shadow p-5 text-center">
            <img
              src={Shukri}
              className="w-full h-80 object-cover"
            />

            <h3 className="text-xl font-bold mt-4">
              Shukri Mohamett
            </h3>

            <p className="text-gray-600">
              Computer Science
            </p>

            <p className="text-gray-500">
              Shukri@gmail.com
            </p>
          </div>



          <div className="bg-white h-{200px}  rounded-xl shadow p-5 text-center">
            <img
              src={Caisha}
              className="w-full h-80 object-cover"
            />

            <h3 className="text-xl font-bold mt-4">
              Caasho Ali
            </h3>

            <p className="text-gray-600">
              Computer Science
            </p>

            <p className="text-gray-500">
              Aisho@gmail.com
            </p>
          </div>



          <div className="bg-white h-{200px} rounded-xl shadow p-5 text-center">
            <img
              src={Sumayah}
              className="w-full h-80 object-cover"
            />

            <h3 className="text-xl font-bold mt-4">
              Sumayah Sulayman
            </h3>

            <p className="text-gray-600">
              Computer Science
            </p>

            <p className="text-gray-500">
              Sumayah@gmail.com
            </p>
          </div>



          <div className="bg-white h-{200px}  rounded-xl shadow p-5 text-center">
            <img
              src={Fatimah}
              className="w-full h-80 object-cover"
            />

            <h3 className="text-xl font-bold mt-4">
              Fatima C/Laahi
            </h3>

            <p className="text-gray-600">
              Computer Science
            </p>

            <p className="text-gray-500">
              Fatimah@gmail.com
            </p>
          </div>


        </div>

      </div>

    </section>

    <Footer/>
    </>
  );
}

export default About;