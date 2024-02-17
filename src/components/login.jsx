
import Fetchani from "@/utilities/fetchani";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Loginserver from "@/utilities/loginserver";
async function dataSubmit(formdata){
  "use server"
const email = formdata.get('email');
const password = formdata.get('password');
const data=await Loginserver(email, password);
if(data['status']==="success"){
  cookies().set('token', data['cookie'], {
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
    path: "/",
  })
  return redirect('/');
} else {
 //
}
}

const Login = ({click}) => {

  return (
    <div className=" relative w-80 shadow-md  bg-zinc-300 rounded-lg flex flex-col ml-auto justify-center items-center  mr-auto mt-10">
      <p className="font-bold  p-4">Login your Account</p>
      <form action={dataSubmit} className="flex flex-col gap-2 justify-center items-center  ">
        <input
          type="email"
          className="h-8 outline-none p-2 rounded-md shadow-md focus:outline-emerald-300 outline-offset-0"
          placeholder="enter email"
          name="email"
        />
        <input
      name="password"
          type="text"
          className="h-8 outline-none p-2 rounded-md shadow-md focus:outline-emerald-300 outline-offset-0 transition-transform duration-200	"
          placeholder="enter password"
       
        />
         <button
          className="bg-teal-400 w-20 p-1 rounded-md font-medium mb-2"
        >
          submit
        </button>
        <Link className=" absolute bottom-2  right-5 text-green-600 underline p-1 rounded-md font-medium " href='/sign'>SIGN IN</Link>

      </form>
    </div>
  );
};

export default Login;