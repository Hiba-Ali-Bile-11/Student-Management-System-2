
import Footer from "../components/Footer";

import { motion } from "framer-motion";

import {
  MapPin,
  Phone,
  Mail,
  Send
} from "lucide-react";

import { Link } from "react-router-dom";
import Header from "../components/Header";


function Contact() {

  return (
    <>

    <Header/>


      <section className="
        min-h-screen
        bg-gradient-to-br
        from-cyan-500
        via-blue-600
        to-blue-900
        pt-28
      ">


        <div className="max-w-7xl mx-auto px-6">


          {/* HEADER */}
          <motion.div
            initial={{opacity:0, y:-50}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8}}
            className="text-center mb-12"
          >

            <h1 className="text-4xl font-bold text-white">
              Contact Us
            </h1>

            <p className="text-gray-100 mt-3">
              We would love to hear from you.
            </p>

          </motion.div>




          <div className="
            grid
            lg:grid-cols-2
            gap-10
          ">



            {/* INFORMATION */}
            <div className="space-y-6">


              <div className="
                bg-white/20
                backdrop-blur-xl
                border
                border-white/30
                rounded-2xl
                p-6
                flex
                items-center
                gap-5
                text-white
                shadow-xl
                hover:-translate-y-2
                transition
              ">

                <MapPin className="text-cyan-300" size={40}/>

                <div>
                  <h3 className="text-xl font-bold">
                    Address
                  </h3>

                  <p>
                    Mogadishu, Somalia
                  </p>
                </div>

              </div>





              <div className="
                bg-white/20
                backdrop-blur-xl
                border
                border-white/30
                rounded-2xl
                p-6
                flex
                items-center
                gap-5
                text-white
                shadow-xl
                hover:-translate-y-2
                transition
              ">

                <Phone className="text-cyan-300" size={40}/>

                <div>
                  <h3 className="text-xl font-bold">
                    Phone
                  </h3>

                  <p>
                    +252 61 1234567
                  </p>
                </div>

              </div>






              <div className="
                bg-white/20
                backdrop-blur-xl
                border
                border-white/30
                rounded-2xl
                p-6
                flex
                items-center
                gap-5
                text-white
                shadow-xl
                hover:-translate-y-2
                transition
              ">

                <Mail className="text-cyan-300" size={40}/>

                <div>
                  <h3 className="text-xl font-bold">
                    Email
                  </h3>

                  <p>
                    info@studentms.com
                  </p>
                </div>

              </div>


            </div>





            {/* MESSAGE FORM */}
            <motion.div

              initial={{
                opacity:0,
                x:100
              }}

              animate={{
                opacity:1,
                x:0
              }}

              transition={{
                duration:0.8
              }}

              className="
              bg-white
              rounded-3xl
              p-8
              shadow-2xl
              "

            >


              <div className="flex items-center gap-3 mb-6">

                <Send className="text-blue-600" size={30}/>

                <h2 className="
                  text-2xl
                  font-bold
                  text-gray-800
                ">
                  Send Message
                </h2>

              </div>



              <input
                type="text"
                placeholder="Your Name"
                className="
                w-full
                border
                p-3
                rounded-lg
                mb-4
                "
              />


              <input
                type="email"
                placeholder="Your Email"
                className="
                w-full
                border
                p-3
                rounded-lg
                mb-4
                "
              />


              <textarea
                placeholder="Your Message"
                className="
                w-full
                border
                p-3
                rounded-lg
                h-32
                "
              />


              <button
                className="
                mt-5
                bg-blue-600
                text-white
                px-6
                py-3
                rounded-lg
                hover:bg-blue-700
                flex
                items-center
                gap-2
                "
              >

                <Send size={18}/>
                Send

              </button>


            </motion.div>


          </div>




          <div className="text-center py-10">

            <Link
              to="/"
              className="
              bg-white
              text-blue-700
              px-8
              py-3
              rounded-full
              font-semibold
              hover:bg-blue-900
              hover:text-white
              transition
              "
            >
              Go Back Home
            </Link>

          </div>


        </div>

      </section>


      <Footer />

    </>
  );
}


export default Contact;