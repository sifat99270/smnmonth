import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const jsonData = await req.json();
    console.log('om', jsonData);
    const prisma = new PrismaClient();
    const header = headers();
    const id = parseInt(header.get("id"));
    const data = await prisma.person.update({
      where: {
        id: jsonData['id'],
        mounthId: jsonData['mounthId'],
        name: jsonData['name']
      },
      data: {
        hazira: jsonData["hazira"],
        rate: jsonData["rate"],
        mot: jsonData["mot"],
        barti: jsonData["barti"],
        khoraki: jsonData["khoraki"],
        gotoMAs: jsonData["gotoMAs"],
        motAll: jsonData["motAll"],
      }
    });

    return NextResponse.json({ status: "success", data: data });
  } catch (e) {
    console.log(e)
    return NextResponse.json({ status: "fail", data: e });
  }
}
