import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";


function Header() {

  const [isOpen, setIsOpen] = useState(false);


  const navLink = ({ isActive }) =>
    `relative px-4 py-2 rounded-full overflow-hidden transition-all duration-500
     ${
       isActive
         ? "text-cyan-300 bg-white/10 border border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)] scale-105"
         : "text-white border border-transparent hover:border-cyan-400 hover:text-cyan-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-110"
     }
     before:absolute before:left-0 before:bottom-0 before:h-[2px]
     before:w-0 before:bg-cyan-300 before:transition-all before:duration-500
     hover:before:w-full`;


  const closeMenu = () => {
    setIsOpen(false);
  };


  return (

    <nav
      className="
      fixed top-0 left-0 w-full z-50
      bg-[#1E3A8A]/70
      backdrop-blur-xl
      border-b border-cyan-400/40
      shadow-[0_8px_30px_rgba(0,0,0,0.3)]
      "
    >

      <div className="
      max-w-7xl mx-auto px-6 py-4 
      flex justify-between items-center
      ">


        {/* Logo */}
        <NavLink
          to="/"
          className="
          text-3xl font-extrabold
          bg-gradient-to-r
          from-cyan-300
          via-white
          to-cyan-300
          bg-clip-text
          text-transparent
          animate-pulse
          hover:scale-110
          transition-all
          duration-500
          "
        >
          StudentMS
        </NavLink>



        {/* Desktop Menu */}
        <ul className="
        hidden md:flex 
        items-center 
        gap-6
        ">

          <li>
            <NavLink to="/" className={navLink}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/services" className={navLink}>
              Services
            </NavLink>
          </li>


          <li>
            <NavLink to="/about" className={navLink}>
              About
            </NavLink>
          </li>


          



          <li>
            <NavLink to="/contact" className={navLink}>
              Contact
            </NavLink>
          </li>

          <li>
            <NavLink to="/login" className={navLink}>
              LogIn
            </NavLink>
          </li>



        </ul>



        {/* Mobile Button */}
        <button

          className="
          md:hidden
          text-white
          p-2
          rounded-lg
          border border-cyan-400/40
          hover:bg-cyan-400
          hover:text-[#1E3A8A]
          hover:rotate-180
          transition-all
          duration-500
          "

          onClick={() => setIsOpen(!isOpen)}

        >

          {
            isOpen 
            ? <X size={28}/>
            : <Menu size={28}/>
          }

        </button>


      </div>




      {/* Mobile Menu */}

      <div

        className={`
        md:hidden 
        overflow-hidden 
        transition-all 
        duration-500
        ${isOpen ? "max-h-96" : "max-h-0"}
        `}

      >

        <ul

          className="
          bg-[#1E3A8A]/95
          backdrop-blur-xl
          flex flex-col
          items-center
          py-6
          gap-5
          border-t
          border-cyan-400/30
          "

        >


          <li>
            <NavLink 
              to="/"
              className={navLink}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>


          <li>
            <NavLink 
              to="/about"
              className={navLink}
              onClick={closeMenu}
            >
              About
            </NavLink>
          </li>


          <li>
            <NavLink 
              to="/services"
              className={navLink}
              onClick={closeMenu}
            >
              Services
            </NavLink>
          </li>


          <li>
            <NavLink 
              to="/students"
              className={navLink}
              onClick={closeMenu}
            >
              Students
            </NavLink>
          </li>


          <li>
            <NavLink 
              to="/contact"
              className={navLink}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>


        </ul>

      </div>


    </nav>

  );
}


export default Header;