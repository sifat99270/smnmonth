
import My from "@/components/my";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
async function person(id,email,mounthId) {
    console.log(id);
    try {
        const prisma = new PrismaClient();
        if (id & mounthId) {
          const person = await prisma.person.findMany({
            where: {
              mounthId: parseInt(mounthId),
              userId: parseInt(id),
            },
          });
          return { status: "success", data: person }
        } else {
          return { status: "success", data: [] }
        }
      } catch (e) {
        console.log(e);
        return { status: "fail", data: e }
      }
    // const res = await fetch(`${process.env.HOST}/api/alls/my?mounthId=${mounthId}`, {
    //     method: "GET",
    //     credentials: 'include',
    //     headers: {
    //         id: id,
    //         email: email
    //     }
    // }, { cache: 'no-store' });
    // const result = await res.json()
    // return result['data'];
}

export default async function page({ searchParams }) {
    const header = headers()
    const id = header.get('id')
    const email =header.get('email')
    const mounthId = searchParams['id']
    const data = await person(id,email,mounthId)
    if (data['data'] instanceof Array && data['data'].length > 0) {
        return (
            <div className="w-full gap-2 flex flex-col justify-center items-center p-2 bg-white shadow-lg shadow-gray-400">
                <p className=" font-extrabold text-emerald-600 bg-white shadow-md shadow-gray-400 rounded-md p-2">sifat</p>
                {data['data'].map((item) => {
                    return (
                        <My persons={item} mounthId={item['mounthId']} key={item['id']} />
                    )
                })}
            </div>
        )
    } else {
        return (
            <div>no data here</div>
        )
    }

}