import Add from "@/components/add";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { data } from "autoprefixer";
import DataAdd from "@/utilities/dataadd";
const getData = async (id,email) => {
    // const res = await fetch(`${process.env.HOST}/api/all/month`,{method:"POST",headers:{
    //   id:id,
    //   email:email 
    // }},{cache: 'no-store'});
    try {
      const prisma = new PrismaClient();
      const data = await prisma.mounth.findMany({
        where: {
          userId: parseInt(id),
        },
      });
      return { status: "success", data: data }
    } catch (e) {
      return { status: "fail", data: [] }
    }
  
  //   const data = await res.json();
  //  // console.log(data)
  //   return data;
  };

export default async function Home() {
  async function dataSubmit(data) {
    "use server"
    const header=headers();
    const id=header.get('id');
  const datas=await DataAdd(id,data)
  return datas;
    // const res = await fetch(`/api/alls/createperson`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: data['name'],
    //     hazira: data['hazira'],
    //     rate: data['rate'],
    //     mot: mot,
    //     khoraki: data['khoraki'],
    //     barti: data['barti'],
    //     gotoMAs: data['gotoMAs'],
    //     motAll: paona,
    //     mounthId: mounthId
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   cache: "no-store"
    // });
    // const result = await res.json()
    // return result;
  }
  const header=headers();
  const id=header.get('id');
  const email=header.get('email')
  const datas=await getData(id,email);
  return (
    <main className="">
      <Add mounthName={datas['data']} dataSubmit={dataSubmit}/>
    </main>
  );
}
