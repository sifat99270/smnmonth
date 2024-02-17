
import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import New from '@/components/new';
async function submit(obj) {
    'use server'
    try {
        const prisma = new PrismaClient();
        const header = headers();
        const id = header.get("id");
        const data = await prisma.mounth.create({
          data: {
            name: obj["mounthName"] + obj["year"],
            userId: parseInt(id),
          },
        });
        return { status: "success", data: data }
      } catch (e) {
        return { status: "fail", data: e }
      }
    // const res = await fetch("/api/alls/createmounth", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: obj["mounthName"] + obj["year"],
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   cache: "no-store",
    // });
    // const result = await res.json();
    // console.log(result);
    // if (result["status"] === "success") {
    //   setObj({
    //     mounthName: "",
    //     year: "",
    //   });
    //   success("mounth create success");
    // } else {
    //   error("mounth create fail");
    // }
}
export default function page() {
    return (
        <div>
            <New submit={submit} />
        </div>
    )
}
