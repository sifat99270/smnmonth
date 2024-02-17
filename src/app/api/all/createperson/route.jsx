import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const jsonData = await req.json();
    const prisma = new PrismaClient();
    const header = headers();
    const id = parseInt(header.get("id"));
    const data = await prisma.person.create({
      data: {
        name: jsonData["name"],
        hazira: jsonData["hazira"],
        rate: jsonData["rate"],
        mot: jsonData["mot"],
        barti: jsonData["barti"],
        khoraki: jsonData["khoraki"],
        gotoMAs: jsonData["gotoMAs"],
        motAll: jsonData["motAll"],
        mounthId: jsonData["mounthId"],
        userId: id,
      },
    });
    return NextResponse.json({ status: "success", data: data });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}