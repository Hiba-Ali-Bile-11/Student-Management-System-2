import React, { useEffect, useState } from "react";

import {Search,Plus,Pencil, Trash2,BookOpen,} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import Swal from "sweetalert2";

import {getCourses, createCourse,updateCourse,deleteCourse} from "../Api/courseApi";

import { getDepartments} from "../Api/departmentApi";


export default function Course(){

const [courses,setCourses] = useState([]);
const [departments,setDepartments] = useState([]);

const [search,setSearch] = useState("");

const [loading,setLoading] = useState(false);
const [saving,setSaving] = useState(false);

const [showModal,setShowModal] = useState(false);

const [isEdit,setIsEdit] = useState(false);
const [editId,setEditId] = useState(null);


const [courseName,setCourseName] = useState("");
const [creditHours,setCreditHours] = useState("");
const [departmentId,setDepartmentId] = useState("");


const [currentPage,setCurrentPage] = useState(1);

const rowsPerPage = 5;



// ================= LOAD COURSES =================

const loadCourses = async()=>{

setLoading(true);

try{

const res = await getCourses();

setCourses(
res?.data ||
res ||
[]
);

}
catch(error){

console.log(error);

}

setLoading(false);

};





// };

const loadDepartments = async()=>{

try{

const res = await getDepartments();

console.log("Departments API:", res);

setDepartments(res?.data || res || []);

}
catch(error){

console.log(error);

}

};



useEffect(()=>{

loadCourses();

loadDepartments();

},[]);




// ================= SEARCH =================

const filteredCourses = courses.filter((c)=>{

const name =
c.courseName ??
c.CourseName ??
"";

return name
.toLowerCase()
.includes(
search.toLowerCase()
);

});



// ================= PAGINATION =================

const totalPages =
Math.ceil(
filteredCourses.length / rowsPerPage
) || 1;


const indexLast =
currentPage * rowsPerPage;


const indexFirst =
indexLast - rowsPerPage;


const currentCourses =
filteredCourses.slice(
indexFirst,
indexLast
);




// ================= CREATE =================

const openCreate = ()=>{

setCourseName("");

setCreditHours("");

setDepartmentId("");

setEditId(null);

setIsEdit(false);

setShowModal(true);

};




// ================= EDIT =================

const openEdit=(c)=>{


setCourseName(
c.courseName ??
c.CourseName
);


setCreditHours(
c.creditHours ??
c.CreditHours
);


setDepartmentId(
c.departmentId ??
c.DepartmentId
);


setEditId(
c.id ??
c.Id ??
c.courseId ??
c.CourseId
);


setIsEdit(true);

setShowModal(true);


};




// ================= DELETE =================

const handleDelete = async(id)=>{


const result =
await Swal.fire({

title:"Are you sure?",

text:"Delete this course?",

icon:"warning",

showCancelButton:true,

confirmButtonText:"Yes Delete"

});



if(result.isConfirmed){


try{


await deleteCourse(id);


Swal.fire(
"Deleted",
"Course deleted successfully",
"success"
);


loadCourses();


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




// ================= SAVE =================


const handleSubmit = async()=>{


if(
!courseName ||
!creditHours ||
!departmentId
){

Swal.fire(
"Error",
"All fields are required",
"error"
);

return;

}



if(
isNaN(Number(creditHours))
){

Swal.fire(
"Error",
"Credit hours must be number",
"error"
);

return;

}



const payload={


courseName,

creditHours:Number(creditHours),

departmentId:Number(departmentId)


};



setSaving(true);


try{


if(isEdit){


await updateCourse(
editId,
payload
);


Swal.fire(
"Success",
"Course Updated Successfully",
"success"
);


}
else{


await createCourse(payload);


Swal.fire(
"Success",
"Course Created Successfully",
"success"
);


}



setShowModal(false);

loadCourses();


}
catch(error){


console.log(error);


Swal.fire(
"Error",
"Something went wrong",
"error"
);


}


setSaving(false);


};
return (

<div className="min-h-screen bg-blue-50 p-8">


{/* HEADER */}

<div className="flex justify-between items-center mb-8">


<div className="flex items-center gap-4">

<div
className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
style={{
background:"linear-gradient(135deg,#1E3A8A,#06B6D4)"
}}
>

<BookOpen
className="text-white"
size={28}
/>

</div>


<div>

<h1 className="text-3xl font-bold text-[#1E3A8A]">
Courses
</h1>

<p className="text-[#06B6D4]">
Total: {filteredCourses.length}
</p>

</div>


</div>




<button

onClick={openCreate}

className="
px-6 py-3 rounded-xl text-white
flex items-center gap-2
shadow-lg hover:scale-105 transition
"

style={{
background:"linear-gradient(135deg,#1E3A8A,#06B6D4)"
}}

>

<Plus size={18}/>

Add Course

</button>


</div>





{/* SEARCH */}

<div className="mb-6 w-96 relative">


<Search
className="absolute left-4 top-3 text-[#06B6D4]"
/>


<input

value={search}

onChange={(e)=>{
setSearch(e.target.value);
setCurrentPage(1);
}}

placeholder="Search course..."

className="
w-full pl-11 py-3 rounded-xl
border border-blue-200
bg-white shadow-sm
outline-none
focus:ring-4 focus:ring-cyan-200
"

/>


</div>






{/* TABLE */}

<div className="bg-white rounded-3xl shadow-2xl overflow-hidden">


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
Course Name
</th>

<th>
Credit Hours
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
colSpan="5"
className="text-center p-6"
>

Loading...

</td>

</tr>


:


currentCourses.length > 0 ?


currentCourses.map((c)=>(


<motion.tr

key={
c.id ??
c.Id ??
c.courseId ??
c.CourseId
}


initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
border-b
hover:bg-cyan-50
"

>


<td className="p-4 text-center">

{
c.id ??
c.Id ??
c.courseId ??
c.CourseId
}

</td>




<td className="text-center">

{
c.courseName ??
c.CourseName
}

</td>




<td className="text-center">

{
c.creditHours ??
c.CreditHours
}

</td>



<td className="text-center">

{
departments.find(
(d)=>d.id === c.departmentId
)?.name
}

</td>


{/* <td className="text-center">
{
c.department?.name
}
</td> */}






<td className="flex justify-center gap-2 p-4">



<button

onClick={()=>openEdit(c)}

className="
w-10 h-10 rounded-lg
bg-blue-100
text-blue-700
hover:bg-blue-600
hover:text-white
flex items-center justify-center
"

>

<Pencil size={18}/>

</button>






<button

onClick={()=>
handleDelete(
c.id ??
c.Id ??
c.courseId ??
c.CourseId
)
}

className="
w-10 h-10 rounded-lg
bg-red-100
text-red-500
hover:bg-red-500
hover:text-white
flex items-center justify-center
"

>

<Trash2 size={18}/>

</button>



</td>



</motion.tr>


))


:


<tr>

<td
colSpan="5"
className="text-center p-6"
>

No Courses Found

</td>

</tr>


}



</tbody>


</table>


</div>






{/* PAGINATION */}


<div className="flex justify-center gap-3 mt-6">


<button

disabled={currentPage===1}

onClick={()=>
setCurrentPage(p=>p-1)
}

className="
px-4 py-2 rounded-lg border
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

onClick={()=>
setCurrentPage(i+1)
}

className="
px-4 py-2 rounded-lg
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

onClick={()=>
setCurrentPage(p=>p+1)
}

className="
px-4 py-2 rounded-lg border
text-[#1E3A8A]
disabled:opacity-40
"

>

Next

</button>


</div>






{/* MODAL */}


<AnimatePresence>


{

showModal &&


<motion.div

className="
fixed inset-0
bg-black/50
flex items-center justify-center
"


initial={{
opacity:0
}}

animate={{
opacity:1
}}

>


<motion.div

initial={{
scale:0.8
}}

animate={{
scale:1
}}

className="
bg-white
rounded-3xl
p-8
w-[500px]
"


>


<h2

className="
text-2xl
font-bold
text-[#1E3A8A]
mb-6
"

>

{
isEdit
?
"Update Course"
:
"Add Course"
}

</h2>




<input

value={courseName}

onChange={(e)=>
setCourseName(e.target.value)
}

placeholder="Course Name"

className="
w-full p-3
rounded-xl
border
mb-3
"

/>





<input

value={creditHours}

onChange={(e)=>
setCreditHours(e.target.value)
}

placeholder="Credit Hours"

className="
w-full p-3
rounded-xl
border
mb-3
"

/>






<select

value={departmentId}

onChange={(e)=> setDepartmentId(e.target.value)
}

className="
w-full p-3
rounded-xl
border
"


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






<div className="flex justify-end gap-3 mt-6">


<button

onClick={()=>
setShowModal(false)
}

className="
px-5 py-3
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
px-5 py-3
rounded-xl
text-white
"

style={{
background:"linear-gradient(135deg,#1E3A8A,#06B6D4)"
}}

>

{
saving ? "Saving..." : isEdit ? "Update" : "Save"
}


</button>



</div>




</motion.div>


</motion.div>


}


</AnimatePresence>



</div>

);

}