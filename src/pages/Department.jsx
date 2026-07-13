import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import Swal from "sweetalert2";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../Api/departmentApi";


export default function Department() {


  const [departments,setDepartments] = useState([]);

  const [search,setSearch] = useState("");

  const [loading,setLoading] = useState(false);

  const [showModal,setShowModal] = useState(false);

  const [saving,setSaving] = useState(false);


  const [editId,setEditId] = useState(null);

  const [isEdit,setIsEdit] = useState(false);


  const [name,setName] = useState("");


  const [currentPage,setCurrentPage] = useState(1);

  const rowsPerPage = 5;



  const loadDepartments = async()=>{

    setLoading(true);

    const res = await getDepartments();

    setDepartments(res?.data || res || []);

    setLoading(false);

  }



  useEffect(()=>{

    loadDepartments();

  },[]);



  // SEARCH

  const filteredDepartments = departments.filter((d)=>

    `${d.name ?? d.Name}`
    .toLowerCase()
    .includes(search.toLowerCase())

  );




  // PAGINATION

  const indexOfLast = currentPage * rowsPerPage;

  const indexOfFirst = indexOfLast - rowsPerPage;


  const currentDepartments =
  filteredDepartments.slice(indexOfFirst,indexOfLast);



  const totalPages =
  Math.ceil(filteredDepartments.length / rowsPerPage);





  // CREATE

  const openCreate = ()=>{

    setName("");

    setIsEdit(false);

    setEditId(null);

    setShowModal(true);

  }





  // EDIT

  const openEdit=(d)=>{


    setName(
      d.name ?? d.Name
    );


    setEditId(
      d.id ?? d.Id
    );


    setIsEdit(true);

    setShowModal(true);


  }






  // SAVE

  const handleSubmit = async()=>{


    if(!name){

      Swal.fire(
        "Error",
        "Department name is required",
        "error"
      );

      return;

    }



    setSaving(true);



    const payload={

      name:name

    };



    if(isEdit){


      await updateDepartment(
        editId,
        payload
      );


      Swal.fire(
        "Success",
        "Department Updated",
        "success"
      );


    }

    else{


      await createDepartment(
        payload
      );


      Swal.fire(
        "Success",
        "Department Created",
        "success"
      );


    }



    setShowModal(false);

    loadDepartments();

    setSaving(false);


  }






  // DELETE

  const handleDelete=async(id)=>{


    const result = await Swal.fire({

      title:"Delete Department?",

      icon:"warning",

      showCancelButton:true,

      confirmButtonColor:"#1E3A8A",

      cancelButtonColor:"#06B6D4",

      confirmButtonText:"Delete"

    });



    if(result.isConfirmed){


      await deleteDepartment(id);



      Swal.fire(
        "Deleted",
        "Department deleted",
        "success"
      );


      loadDepartments();

    }


  }




return (

<div className="min-h-screen bg-blue-50 p-8">



{/* HEADER */}

<div className="flex justify-between items-center mb-8">


<div className="flex items-center gap-4">


<div

className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"

style={{

background:
"linear-gradient(135deg,#1E3A8A,#06B6D4)"

}}

>

<Building2
className="text-white"
size={28}
/>

</div>



<div>

<h1 className="text-3xl font-bold text-[#1E3A8A]">

Departments

</h1>


<p className="text-[#06B6D4]">

Total: {filteredDepartments.length}

</p>


</div>


</div>





<button

onClick={openCreate}

className="px-6 py-3 rounded-xl text-white flex items-center gap-2 shadow-lg hover:scale-105 transition"


style={{

background:
"linear-gradient(135deg,#1E3A8A,#06B6D4)"

}}

>

<Plus size={18}/>

Add Department

</button>


</div>






{/* SEARCH */}

<div className="mb-6 w-96 relative">


<Search

className="absolute left-4 top-3 text-[#06B6D4]"

/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search department..."

className="w-full pl-11 py-3 rounded-xl border border-blue-200 bg-white shadow-sm outline-none focus:ring-4 focus:ring-cyan-200"

/>


</div>







{/* TABLE */}


<div className="bg-white rounded-3xl shadow-2xl overflow-hidden">


<table className="w-full">


<thead

className="text-white"

style={{

background:
"linear-gradient(135deg,#1E3A8A,#06B6D4)"

}}

>

<tr>

<th className="p-4">
ID
</th>

<th>
Department Name
</th>

<th>
Actions
</th>

</tr>

</thead>



<tbody>


{
loading ? (

<tr>

<td colSpan="3"
className="text-center p-6">

Loading...

</td>

</tr>


)

:

currentDepartments.length > 0 ?

currentDepartments.map((d)=>(


<motion.tr

key={d.id ?? d.Id}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="border-b hover:bg-cyan-50"


>


<td className="p-4 text-center">

{d.id ?? d.Id}

</td>



<td className="text-center">

{d.name ?? d.Name}

</td>



<td className="flex justify-center gap-2 p-4">


<button

onClick={()=>openEdit(d)}

className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white flex items-center justify-center"

>

<Pencil size={18}/>

</button>




<button

onClick={()=>handleDelete(d.id ?? d.Id)}

className="w-10 h-10 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center"

>

<Trash2 size={18}/>

</button>


</td>



</motion.tr>


))


:

<tr>

<td colSpan="3"
className="text-center p-6">

No Departments Found

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

onClick={()=>setCurrentPage(p=>p-1)}

className="px-4 py-2 rounded-lg border"

>

Previous

</button>



{
[...Array(totalPages)].map((_,i)=>(

<button

key={i}

onClick={()=>setCurrentPage(i+1)}

className={`px-4 py-2 rounded-lg ${
currentPage===i+1
?
"text-white"
:
"border"
}`}


style={{

background:
currentPage===i+1
?
"linear-gradient(135deg,#1E3A8A,#06B6D4)"
:
"white"

}}

>

{i+1}

</button>


))

}



<button

disabled={currentPage===totalPages}

onClick={()=>setCurrentPage(p=>p+1)}

className="px-4 py-2 rounded-lg border"

>

Next

</button>


</div>






{/* MODAL */}


<AnimatePresence>

{

showModal &&

<motion.div

className="fixed inset-0 bg-black/50 flex items-center justify-center"

>


<motion.div

initial={{
scale:0
}}

animate={{
scale:1
}}

className="bg-white rounded-3xl p-8 w-[500px]"

>


<h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">

{isEdit ? "Update Department":"Add Department"}

</h2>



<input

className="w-full p-3 rounded-xl border"

placeholder="Department Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>



<div className="flex justify-end gap-3 mt-6">


<button

onClick={()=>setShowModal(false)}

className="px-5 py-3 rounded-xl border"

>

Cancel

</button>



<button

onClick={handleSubmit}

className="px-5 py-3 rounded-xl text-white"

style={{

background:
"linear-gradient(135deg,#1E3A8A,#06B6D4)"

}}

>

{saving?"Saving...":isEdit?"Update":"Save"}

</button>


</div>



</motion.div>


</motion.div>

}

</AnimatePresence>



</div>

)

}