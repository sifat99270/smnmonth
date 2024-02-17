
import { redirect } from "next/navigation";
import { error, success } from "@/utilities/tosthandler";
import Fetchani from "@/utilities/fetchani";
import { PrismaClient } from "@prisma/client";
import { VerifyToken } from "@/utilities/token";
import { cookies } from "next/headers";
import Checkotp from "@/utilities/check";
async function dataSubmit(formdata) {
  "use server"
  const otp=formdata.get('otp');
const data=await Checkotp(otp);
if(data['status'==="success"]) {
  return redirect('/login');
} else {
 //
}
//   const result = await fetch(`${process.env.HOST}/api/user/check?otp=${otp}`, {
//     cache: "no-store",
//   });

//   const json = await result.json();
//  return json;
}
const Check = () => {


  return (
    <div className="w-80 shadow-md  bg-zinc-300 rounded-lg flex flex-col ml-auto justify-center items-center  mr-auto mt-10">
      <p className="font-bold  p-4">Registration</p>
      <form action={dataSubmit} className="flex flex-col gap-2 justify-center items-center  ">
        <input
          type="text"
          className="h-8 outline-none p-2 rounded-md shadow-md focus:outline-emerald-300 outline-offset-0"
          placeholder="enter otp"
          name="otp"
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

export default Check;
