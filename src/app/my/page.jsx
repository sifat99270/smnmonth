import { headers } from "next/headers";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
async function Page() {
  const header=headers();
const id=header['id'];
const email=header['email'];
  async function getData() {
    try {
      const prisma = new PrismaClient();
      const data = await prisma.mounth.findMany({
        where: {
          userId: id,
        },
      });
      return{ status: "success", data: data }
    } catch (e) {
      return { status: "fail", data: [] }
    }

      // const res = await fetch(`${process.env.HOST}/api/alls/mount`, {
      //   method: "POST", headers: {
      //     id: id,
      //     email: email
      //   }
      // }, { cache: 'no-store' });
      // const result = await res.json()
      // return result['data'];

  }


  const allMounth = await getData();
 

  if (allMounth['data'] instanceof Array && allMounth['data'].length > 0) {
    return (
      <div className=" w-1/2 rounded-lg mx-auto p-2 flex flex-col gap-3 justify-center items-center bg-white shadow-lg shadow-gray-400">
        {allMounth['data'].map((item, i) => {
          return (<Link key={item['id']} href={`/all?id=${item['id']}`} className="w-full">
            <div className=" flex justify-center items-center w-full h-12 rounded-md shadow-lg text-white font-extrabold text-xl bg-slate-300 hover:bg-teal-400">{item['name']}</div>
          </Link>
          )
        })}
      </div>
    )
  } else {
    return <p>
      no data here
    </p>
  }
}

export default Page;