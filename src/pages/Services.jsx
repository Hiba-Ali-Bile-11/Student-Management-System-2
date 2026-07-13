import course from "../assets/images/CourseManagement.jpg";
import Registartion from "../assets/images/Resigration.jpg";
import Attendence from "../assets/images/Attendance.jpg";
import grade from "../assets/images/Grade.jpg";
import Report from "../assets/images/Reports.jpg";
import profile from "../assets/images/profile.jpg";
import Header from "../components/Header";
import { div } from "framer-motion/client";
import Footer from "../components/Footer";

function Services() {
  return (
    <>
    
    <Header/>
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-5">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Our Services
          </h2>
          <p className="text-gray-500 mt-2">
            Manage your student system easily
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


          <div className="bg-white rounded-xl shadow p-5">
            <img
              src={Registartion}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-4">
              Student Registration
            </h3>

            <p className="text-gray-600 mt-2">
              Register and manage students quickly and securely.
            </p>
          </div>



          <div className="bg-white rounded-xl shadow p-5">
            <img
              src={course}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-4">
              Course Management
            </h3>

            <p className="text-gray-600 mt-2">
              Create and organize courses with ease.
            </p>
          </div>



          <div className="bg-white rounded-xl shadow p-5">
            <img
              src={Attendence}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-4">
              Attendance Tracking
            </h3>

            <p className="text-gray-600 mt-2">
              Monitor student attendance efficiently.
            </p>
          </div>



          <div className="bg-white rounded-xl shadow p-5">
            <img
              src={grade}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-4">
              Grades Management
            </h3>

            <p className="text-gray-600 mt-2">
              Manage student grades and performance.
            </p>
          </div>



          <div className="bg-white rounded-xl shadow p-5">
            <img
              src={Report}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-4">
              Reports
            </h3>

            <p className="text-gray-600 mt-2">
              Generate academic reports instantly.
            </p>
          </div>



          <div className="bg-white rounded-xl shadow p-5">
            <img
              src={profile}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-4">
              Student Profiles
            </h3>

            <p className="text-gray-600 mt-2">
              Maintain complete student profiles.
            </p>
          </div>


        </div>

      </div>
    </section>

    <Footer/>

    </>
  );
}

export default Services;