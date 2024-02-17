import { PrismaClient } from "@prisma/client";

export default async function DataAdd(id,data){
    try {
        const prisma = new PrismaClient();
        const dat = await prisma.person.create({
          data: {
            name: data["name"],
            hazira: data["hazira"],
            rate: data["rate"],
            mot: data["mot"],
            barti: data["barti"],
            khoraki: data["khoraki"],
            gotoMAs: data["gotoMAs"],
            motAll: data["motAll"],
            mounthId: parseInt(data["mounthId"]),
            userId: parseInt(id),
          },
        });
        return{ status: "success", data: dat}
      } catch (e) {
        console.log(e)
        return { status: "fail", data: e }
      }
}