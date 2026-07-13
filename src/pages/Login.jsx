import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
Mail,
Lock,
Eye,
EyeOff,
KeyRound,
X
} from "lucide-react";

import { motion } from "framer-motion";
import Swal from "sweetalert2";

import {
loginUser,
changePassword,
forgetPassword
} from "../Api/userApi";

export default function Login() {

const [showPassword, setShowPassword] = useState(false);

const [showChange, setShowChange] = useState(false);
const [showForget, setShowForget] = useState(false);


const [loginData, setLoginData] = useState({
    email:"",
    password:""
});


const [changeData,setChangeData] = useState({
    email:"",
    oldPassword:"",
    newPassword:""
});


const [forgetData, setForgetData] = useState({
    email: "",
    newPassword: ""
});


const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await loginUser(loginData);

    // Haddii aad isticmaalayso ProtectedRoute
    localStorage.setItem("user", JSON.stringify(response));

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome back",
      timer: 2000,
      showConfirmButton: false,
    });

    navigate("/Dashboard");

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email or password",
    });
  }
};




const handleChangePassword = async(e)=>{

    e.preventDefault();

    try{

        await changePassword(changeData);


        Swal.fire({
            icon:"success",
            title:"Password Changed",
            text:"Your password has been updated"
        });

        setChangeData({
              email:"",
              oldPassword:"",
              newPassword:""
        })


        setShowChange(false);

        


    }catch(error){

        Swal.fire({
            icon:"error",
            title:"Error",
            text:"Password change failed"
        });

    }

};



const handleForgetPassword = async (e) => {
    e.preventDefault();

    try {

        await forgetPassword(forgetData);

        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password changed successfully"
        });

        // Nadiifi inputs-ka
        setForgetData({
            email: "",
            newPassword: ""
        });

        // Xir modal-ka (haddii aad rabto)
        setShowForget(false);

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data || "Email not found"
        });

    }
};


return(

<div className="
min-h-screen 
flex 
items-center 
justify-center
bg-gradient-to-br 
from-[#1E3A8A]
via-[#06B6D4]
to-[#1E3A8A]
">

<motion.div

initial={{opacity:0,y:50}}

animate={{opacity:1,y:0}}

transition={{duration:.6}}

className="
bg-white
w-[400px]
rounded-3xl
shadow-2xl
p-8
"

>

<h1 className="
text-3xl
font-bold
text-center
text-[#1E3A8A]
mb-2
">
Login
</h1>

<p className="
text-center
text-gray-500
mb-6
">
Student Management System
</p>

<form onSubmit={handleLogin}>

<div className="mb-4 relative">

<Mail 
className="
absolute
left-3
top-3
text-[#06B6D4]
"
/>

<input

type="email"

placeholder="Email"

value={loginData.email}

onChange={(e)=>
setLoginData({
...loginData,
email:e.target.value
})
}

className="
w-full
border
rounded-xl
py-3
pl-10
outline-none
focus:ring-2
focus:ring-[#06B6D4]
"

/>

</div>

<div className="mb-5 relative">

<Lock
className="
absolute
left-3
top-3
text-[#06B6D4]
"
/>

<input

type={showPassword?"text":"password"}

placeholder="Password"

value={loginData.password}

onChange={(e)=>
setLoginData({
...loginData,
password:e.target.value
})
}

className="
w-full
border
rounded-xl
py-3
pl-10
pr-10
outline-none
focus:ring-2
focus:ring-[#06B6D4]
"

/>

<button

type="button"

onClick={()=>
setShowPassword(!showPassword)
}

className="
absolute
right-3
top-3
"

>

{
showPassword? <EyeOff/>
: <Eye/>
}

</button>

</div>

<button

className="
w-full
py-3
rounded-xl
text-white
font-semibold
bg-gradient-to-r
from-[#1E3A8A]
to-[#06B6D4]
hover:scale-105
transition
"

>

Login

</button>

</form>

<div className="
flex
justify-between
mt-5
text-sm
">

<button

onClick={()=>setShowForget(true)}

className="
text-[#1E3A8A]
hover:underline
"

>

Forget Password? </button>

<button

onClick={()=>setShowChange(true)}

className="
text-[#06B6D4]
hover:underline
"

>

Change Password </button>

</div>

</motion.div>

{/* CHANGE PASSWORD MODAL */}

{
showChange &&

<div className="
fixed inset-0
bg-black/50
flex
items-center
justify-center
">

<motion.div

initial={{scale:.7}}

animate={{scale:1}}

className="
bg-white
p-6
rounded-2xl
w-[350px]
"

>

<button

onClick={()=>setShowChange(false)}

className="float-right"

>

<X/>

</button>

<h2 className="
text-xl
font-bold
mb-4
text-[#1E3A8A]
">
Change Password
</h2>

<form onSubmit={handleChangePassword}>

<div className="relative mb-4">

<Mail
className="
absolute
left-3
top-3
text-[#06B6D4]
"
/>

<input

className="
w-full
border
rounded-xl
py-3
pl-10
outline-none
focus:ring-2
focus:ring-[#06B6D4]
"

type="email"

placeholder="Email"

value={changeData.email}

required

onChange={(e)=>
setChangeData({
...changeData,
email:e.target.value
})
}

/>

</div>



<div className="relative mb-4">

<Lock
className="
absolute
left-3
top-3
text-[#06B6D4]
"
/>


<input

className="
w-full
border
rounded-xl
py-3
pl-10
outline-none
focus:ring-2
focus:ring-[#06B6D4]
"

type="password"

placeholder="Old Password"

value={changeData.oldPassword}

required

onChange={(e)=>
setChangeData({
...changeData,
oldPassword:e.target.value
})
}

/>

</div>




<div className="relative mb-5">


<KeyRound

className="
absolute
left-3
top-3
text-[#06B6D4]
"

/>


<input

className="
w-full
border
rounded-xl
py-3
pl-10
outline-none
focus:ring-2
focus:ring-[#06B6D4]
"

type="password"

placeholder="New Password"

value={changeData.newPassword}

required

onChange={(e)=>
setChangeData({
...changeData,
newPassword:e.target.value
})
}

/>


</div>




<button

type="submit"

className="
w-full
py-3
rounded-xl
text-white
font-semibold
bg-gradient-to-r
from-[#1E3A8A]
to-[#06B6D4]
hover:scale-105
transition
duration-300
"

>

Change Password

</button>


</form>

</motion.div>

</div>

}

{/* FORGET PASSWORD MODAL */}

{
showForget &&

<div
className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
"
>

<motion.div
initial={{ scale: 0.7, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.3 }}
className="
bg-white
p-7
rounded-3xl
w-[380px]
shadow-2xl
"
>

<button
type="button"
onClick={() => setShowForget(false)}
className="
float-right
text-gray-500
hover:text-red-500
transition
"
>
<X size={22} />
</button>

<h2
className="
text-2xl
font-bold
mb-2
text-[#1E3A8A]
"
>
Forget Password
</h2>

<p
className="
text-gray-500
text-sm
mb-6
"
>
Enter your email and your new password.
</p>

<form onSubmit={handleForgetPassword}>

{/* Email */}

<div className="relative mb-4">

<Mail
className="
absolute
left-3
top-3.5
text-[#06B6D4]
"
/>

<input
    type="email"
    placeholder="Email"
    value={forgetData.email}
    onChange={(e) =>
        setForgetData({
            ...forgetData,
            email: e.target.value

        })
        }
        className="
        w-full
        border
        rounded-xl
        py-3
        pl-10
        outline-none
        focus:ring-2
        focus:ring-[#06B6D4]
        "
        />

</div>

{/* New Password */}

<div className="relative mb-6">

<Lock
className="
absolute
left-3
top-3.5
text-[#06B6D4]
"
/>

<input
    type="password"
    placeholder="New Password"
    value={forgetData.newPassword}
    onChange={(e) =>
        setForgetData({
            ...forgetData,
            newPassword: e.target.value
})
}
className="
w-full
border
rounded-xl
py-3
pl-10
outline-none
focus:ring-2
focus:ring-[#06B6D4]
"
/>

</div>

<button
type="submit"
className="
w-full
py-3
rounded-xl
text-white
font-semibold
bg-gradient-to-r
from-[#1E3A8A]
to-[#06B6D4]
hover:scale-105
transition
duration-300
"
>
save Password
</button>

</form>

</motion.div>

</div>

}


</div>

)

}
