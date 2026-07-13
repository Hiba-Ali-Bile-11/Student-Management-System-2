import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  Plus,
  Search,
  Edit,
  Trash2,
  User,
  Phone,
  MapPin,
  GraduationCap,
  Users,
  X,
  LoaderCircle
} from "lucide-react";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudent
} from "../api/studentApi";

import { getDepartments } from "../api/departmentApi";


const Student = () => {


const [students,setStudents] = useState([]);
const [departments,setDepartments] = useState([]);

const [loading,setLoading] = useState(false);
const [saving,setSaving] = useState(false);

const [showModal,setShowModal] = useState(false);

const [editingId,setEditingId] = useState(null);

const [search,setSearch] = useState("");

const [currentPage,setCurrentPage] = useState(1);

const studentsPerPage = 20;



const [form,setForm] = useState({

firstName:"",
lastName:"",
gender:"",
age:"",
address:"",
phone:"",
parentPhone:"",
departmentId:""

});



// ================= LOAD DATA =================


useEffect(()=>{

loadStudents();
loadDepartments();

},[]);




// ================= GET STUDENTS =================


const loadStudents = async()=>{

try{

setLoading(true);

const res = await getStudents();


setStudents(

res?.data ||
res ||
[]

);


}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}

};




// ================= GET DEPARTMENT =================


const loadDepartments = async()=>{

try{

const res = await getDepartments();

console.log("Department data:", res);

setDepartments(
    res?.data || res || []
);

}
catch(error){

console.log(error);

}

};




// ================= INPUT =================


const handleChange = (e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});


};





// ================= OPEN ADD =================


const openAdd = ()=>{


setEditingId(null);


setForm({

firstName:"",
lastName:"",
gender:"",
age:"",
address:"",
phone:"",
parentPhone:"",
departmentId:""

});


setShowModal(true);


};





// ================= EDIT =================


const openEdit = (student)=>{


setEditingId(student.id);


setForm({

firstName:student.firstName,
lastName:student.lastName,
gender:student.gender,
age:student.age,
address:student.address,
phone:student.phone,
parentPhone:student.parentPhone,

departmentId: student.departmentId || ""

});


setShowModal(true);


};






// ================= SAVE =================
const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !form.firstName ||
    !form.lastName ||
    !form.gender ||
    !form.age ||
    !form.phone ||
    !form.departmentId
  ) {
    Swal.fire(
      "Warning",
      "Please fill required fields",
      "warning"
    );
    return;
  }


  const payload = {
    firstName: form.firstName,
    lastName: form.lastName,
    gender: form.gender,
    age: Number(form.age),
    address: form.address,
    phone: form.phone,
    parentPhone: form.parentPhone,
    departmentId: Number(form.departmentId),
  };


  console.log("Sending Data:", payload);


  try {

    setSaving(true);


    if (editingId) {

      await updateStudent(
        editingId,
        payload
      );


      Swal.fire(
        "Success",
        "Student updated successfully",
        "success"
      );


    } else {


      await createStudent(payload);


      Swal.fire(
        "Success",
        "Student added successfully",
        "success"
      );

    }


    // refresh students list
    const data = await getStudents();
    setStudents(data);


    // reset form
    setForm({
      firstName:"",
      lastName:"",
      gender:"",
      age:"",
      address:"",
      phone:"",
      parentPhone:"",
      departmentId:""
    });


    setEditingId(null);





 



setShowModal(false);

loadStudents();


}


catch(error){

console.log(error);


Swal.fire(
"Error",
"Something went wrong",
"error"
);


}

finally{

setSaving(false);

}


};





// ================= SEARCH =================


const handleSearch = async(e)=>{


const value = e.target.value;


setSearch(value);


setCurrentPage(1);



if(value===""){

loadStudents();

return;

}



try{


const res = await searchStudent(value);


setStudents(

res?.data ||
res ||
[]

);


}

catch(error){

console.log(error);

}


};






// ================= DELETE =================


const handleDelete = async(id)=>{


const result = await Swal.fire({

title:"Delete Student?",

text:"Student will be removed",

icon:"warning",

showCancelButton:true,

confirmButtonText:"Delete"

});



if(result.isConfirmed){


try{


await deleteStudent(id);


Swal.fire(
"Deleted",
"Student deleted successfully",
"success"
);


loadStudents();


}

catch(error){


Swal.fire(
"Error",
"Delete failed",
"error"
);


}


}


};





// ================= PAGINATION =================


const totalPages = Math.ceil(

students.length / studentsPerPage

) || 1;



const indexLast = currentPage * studentsPerPage;

const indexFirst = indexLast - studentsPerPage;


const currentStudents = students.slice(

indexFirst,

indexLast

);

return (

<div className="min-h-screen bg-blue-50 p-8">

<div className="max-w-7xl mx-auto">


{/* ================= HEADER ================= */}

<div className="flex flex-col sm:flex-row justify-between items-center gap-5 mb-8">


<div className="flex items-center gap-4">


<div

className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"

style={{

background:"linear-gradient(135deg,#1E3A8A,#06B6D4)"

}}

>

<Users

className="text-white"

size={30}

/>


</div>




<div>


<h1 className="text-3xl font-bold text-[#1E3A8A]">

Students

</h1>


<p className="text-[#06B6D4]">

Total: {students.length}

</p>


</div>


</div>





<button

onClick={openAdd}

className="
px-6 py-3
rounded-xl
text-white
flex items-center
gap-2
shadow-lg
hover:scale-105
transition
w-full sm:w-auto
"

style={{

background:"linear-gradient(135deg,#1E3A8A,#06B6D4)"

}}

>


<Plus size={18}/>

Add Student


</button>


</div>







{/* ================= SEARCH ================= */}


<div className="mb-6 w-full sm:w-96 relative">


<Search

className="absolute left-4 top-3 text-[#06B6D4]"

/>


<input

value={search}

onChange={handleSearch}

placeholder="Search student..."

className="
w-full
pl-11
py-3
rounded-xl
border
border-blue-200
bg-white
shadow-sm
outline-none
focus:ring-4
focus:ring-cyan-200
"

/>


</div>






{/* ================= MODAL FORM ================= */}



{

showModal && (



<div

className="
fixed inset-0
bg-black/50
flex
items-center
justify-center
z-50
p-4
overflow-y-auto
"

>


<div

className="
bg-white
rounded-3xl
shadow-2xl
w-full
max-w-4xl
p-6
my-5
"

>



{/* MODAL TITLE */}


<div className="flex justify-between items-center mb-6">


<h2 className="text-2xl font-bold text-[#1E3A8A] flex items-center gap-2">


<User size={28}/>


{

editingId

?

"Update Student"

:

"Add Student"

}


</h2>



<button

onClick={()=>setShowModal(false)}

className="
p-2
rounded-full
bg-red-100
text-red-600
"

>


<X size={22}/>


</button>


</div>







{/* FORM GRID */}


<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-4
">





{/* FIRST NAME */}


<div>

<label className="font-semibold">

First Name

</label>


<input

name="firstName"

value={form.firstName}

onChange={handleChange}

placeholder="First Name"

className="
w-full
mt-2
p-3
rounded-xl
border
focus:ring-2
focus:ring-cyan-400
outline-none
"

/>

</div>






{/* LAST NAME */}


<div>

<label className="font-semibold">

Last Name

</label>


<input

name="lastName"

value={form.lastName}

onChange={handleChange}

placeholder="Last Name"

className="
w-full
mt-2
p-3
rounded-xl
border
focus:ring-2
focus:ring-cyan-400
outline-none
"

/>

</div>








{/* GENDER */}


<div>


<label className="font-semibold">

Gender

</label>


<select

name="gender"

value={form.gender}

onChange={handleChange}

className="
w-full
mt-2
p-3
rounded-xl
border
outline-none
"

>


<option value="">

Select Gender

</option>


<option value="Male">

Male

</option>


<option value="Female">

Female

</option>


</select>


</div>







{/* AGE */}


<div>


<label className="font-semibold">

Age

</label>


<input

type="number"

name="age"

value={form.age}

onChange={handleChange}

placeholder="Age"

className="
w-full
mt-2
p-3
rounded-xl
border
outline-none
"

/>


</div>







{/* ADDRESS */}


<div>


<label className="font-semibold">

Address

</label>


<div className="relative">


<MapPin

size={20}

className="absolute left-3 top-3 text-cyan-500"

/>


<input

name="address"

value={form.address}

onChange={handleChange}

placeholder="Address"

className="
w-full
pl-10
mt-2
p-3
rounded-xl
border
outline-none
"

/>


</div>


</div>







{/* PHONE */}


<div>


<label className="font-semibold">

Phone

</label>


<div className="relative">


<Phone

size={20}

className="absolute left-3 top-3 text-cyan-500"

/>



<input

name="phone"

value={form.phone}

onChange={handleChange}

placeholder="Phone"

className="
w-full
pl-10
mt-2
p-3
rounded-xl
border
outline-none
"

/>


</div>


</div>







{/* PARENT PHONE */}


<div>


<label className="font-semibold">

Parent Phone

</label>


<input

name="parentPhone"

value={form.parentPhone}

onChange={handleChange}

placeholder="Parent Phone"

className="
w-full
mt-2
p-3
rounded-xl
border
outline-none
"

/>


</div>







{/* DEPARTMENT */}


<div>


<label className="font-semibold flex gap-2 items-center">

<GraduationCap size={20}/>

Department

</label>



<select
name="departmentId"
value={form.departmentId}
onChange={handleChange}
className="w-full mt-2 p-3 rounded-xl border"
>

<option value="">
Select Department
</option>

{
departments.map((d)=>(

<option
key={d.id}
value={d.id}
>

{d.name}

</option>

))
}

</select>





</div>




</div>







{/* BUTTONS */}


<div className="flex justify-end gap-3 mt-6">


<button

onClick={()=>setShowModal(false)}

className="
px-5
py-3
rounded-xl
border
"

>

Cancel

</button>





<button

onClick={handleSubmit}

disabled={saving}

className="
px-6
py-3
rounded-xl
text-white
"

style={{

background:"linear-gradient(135deg,#1E3A8A,#06B6D4)"

}}

>


{

saving

?

"Saving..."

:

editingId

?

"Update"

:

"Save"

}


</button>



</div>





</div>


</div>



)


}

{/* ================= STUDENT TABLE ================= */}


<div className="
bg-white
rounded-3xl
shadow-2xl
overflow-hidden
">


<table className="w-full">


<thead

className="text-white"

style={{

background:"linear-gradient(135deg,#1E3A8A,#06B6D4)"

}}

>


<tr>


<th className="p-4">
ID
</th>


<th>
Name
</th>


<th>
Gender
</th>


<th>
Age
</th>


<th>
Phone
</th>
<th>
parent-Phone
</th>


<th>
Department
</th>


<th>
Actions
</th>


</tr>


</thead>





<tbody>


{

loading ?


<tr>


<td

colSpan="7"

className="text-center p-6"

>

<div className="flex justify-center gap-2 items-center">

<LoaderCircle className="animate-spin"/>

Loading...

</div>


</td>


</tr>



:



currentStudents.length > 0 ?


currentStudents.map((student,index)=>(



<tr

key={student.id}

className="
border-b
hover:bg-cyan-50
transition
"

>


<td className="p-4 text-center">

{

index + 1

}

</td>




<td className="p-4 text-center font-semibold">


{student.firstName}

{" "}

{student.lastName}


</td>





<td className="text-center">


{student.gender}


</td>






<td className="text-center">


{student.age}


</td>





<td className="text-center">


{student.phone}


</td>

<td className="text-center">


{student.parentPhone}


</td>







<td className="text-center">
{
student.department
}
</td>






<td>


<div className="
flex
justify-center
gap-2
">


<button

onClick={()=>openEdit(student)}

className="
w-10
h-10
rounded-lg
bg-blue-100
text-blue-700
hover:bg-blue-600
hover:text-white
flex
items-center
justify-center
transition
"

>

<Edit size={18}/>

</button>







<button

onClick={()=>handleDelete(student.id)}

className="
w-10
h-10
rounded-lg
bg-red-100
text-red-500
hover:bg-red-500
hover:text-white
flex
items-center
justify-center
transition
"

>


<Trash2 size={18}/>


</button>




</div>


</td>



</tr>



))



:



<tr>


<td

colSpan="7"

className="text-center p-6"

>

No Students Found

</td>


</tr>


}



</tbody>


</table>


</div>









{/* ================= MOBILE CARD ================= */}



<div className="
md:hidden
space-y-4
mt-6
">


{

currentStudents.map((student,index)=>(


<div

key={student.id}

className="
bg-white
rounded-2xl
shadow-lg
p-5
border
"

>


<div className="
flex
justify-between
items-center
">


<h3 className="
font-bold
text-[#1E3A8A]
flex
items-center
gap-2
">


<User size={20}/>


{student.firstName}

{" "}

{student.lastName}


</h3>


<span>

#{index+1}

</span>


</div>





<div className="
mt-4
space-y-2
text-sm
">


<p>

<b>Gender:</b> {student.gender}

</p>


<p>

<b>Age:</b> {student.age}

</p>


<p>

<b>Phone:</b> {student.phone}

</p>


<p>

<b>Department:</b>

{

student.department?.name

}

</p>


</div>





<div className="
flex
gap-3
mt-5
">


<button

onClick={()=>openEdit(student)}

className="
flex-1
py-2
rounded-xl
bg-blue-100
text-blue-900
"

>

<Edit size={18}/>

</button>






<button

onClick={()=>handleDelete(student.id)}

className="
flex-1
py-2
rounded-xl
bg-red-100
text-red-600
"

>

<Trash2 size={18}/>

</button>


</div>



</div>


))


}


</div>









{/* ================= PAGINATION ================= */}



<div className="
flex
justify-center
gap-3
mt-6
flex-wrap
">


<button

disabled={currentPage===1}

onClick={()=>setCurrentPage(p=>p-1)}

className="
px-4
py-2
rounded-lg
border
text-[#1E3A8A]
disabled:opacity-40
"

>

Previous

</button>





{

[...Array(totalPages)].map((_,i)=>(


<button

key={i}

onClick={()=>setCurrentPage(i+1)}

className="
px-4
py-2
rounded-lg
"

style={{

background:

currentPage===i+1

?

"linear-gradient(135deg,#1E3A8A,#06B6D4)"

:

"white",


color:

currentPage===i+1

?

"white"

:

"#1E3A8A"


}}

>


{i+1}


</button>


))


}







<button

disabled={currentPage===totalPages}

onClick={()=>setCurrentPage(p=>p+1)}

className="
px-4
py-2
rounded-lg
border
text-[#1E3A8A]
disabled:opacity-40
"

>

Next

</button>


</div>






</div>
</div>

);

};


export default Student;
