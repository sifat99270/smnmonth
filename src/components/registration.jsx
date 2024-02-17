

import { success, error } from "@/utilities/tosthandler";
import { cookies } from "next/headers";
import Sign from "@/utilities/sign";
import { redirect } from "next/navigation";
async function dataSubmit(formdata) {
  'use server';
  const firstName=formdata.get('firstName');
  const lastName=formdata.get('lastName') ;
  const email=formdata.get('email');
  const password=formdata.get('password');
  const cookie=cookies();
 const data=await Sign(firstName, lastName, email, password)

if(data['status']==="success"){
  cookie.set('check', data['cookie'],{expires:Date.now()+(60*60*72),secure:true,path:"/"});
 return redirect('/checkotp');
}else{
  return{
    status:'fail',
    data:"there was an error"
  }
}
 
}

const Registration = () => {
 
  return (
    <div className="w-80 shadow-md  bg-zinc-300 rounded-lg flex flex-col ml-auto justify-center items-center  mr-auto mt-10">
      <p className="font-bold  p-4">Registration</p>
      
    <form className="flex flex-col gap-2 justify-center items-center " action={dataSubmit}>
    <input
          type="text"
          className="h-8 outline-none p-2 rounded-md shadow-md focus:outline-emerald-300 outline-offset-0"
          placeholder="enter firsrname"
          name="firstName"
         
        />
        <input
          type="text"
          className="h-8 outline-none p-2 rounded-md shadow-md focus:outline-emerald-300 outline-offset-0"
          placeholder="enter lastname"
          name="lastName"
        
        />

        <input
         
          type="email"
          className="h-8 outline-none p-2 rounded-md shadow-md focus:outline-emerald-300 outline-offset-0"
          placeholder="enter email"
        name="email"
        />
        <input
          type="password"
          className="h-8 outline-none p-2 rounded-md shadow-md focus:outline-emerald-300 outline-offset-0 transition-transform duration-200	"
          placeholder="enter password"
         name="password"
        />
        <input
          type="password"
          className="h-8 outline-none p-2 rounded-md shadow-md focus:outline-emerald-300 outline-offset-0 transition-transform duration-200	"
          placeholder="confrim password"
          name="confrim"
        />
        <button type="submit"
          className="bg-teal-400 w-20 p-1 rounded-md font-medium mb-2"

        >
          submit
        </button>
    </form>
    </div>
  );
};

export default Registration;