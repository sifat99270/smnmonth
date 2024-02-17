import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const prisma = new PrismaClient();
    const header = headers();
    const userId = parseInt(header.get("id"));
    const mounthId = parseInt(searchParams.get('mounthId'))
    console.log(mounthId)
    if (userId & mounthId) {
      const person = await prisma.person.findMany({
        where: {
          mounthId: mounthId,
          userId: userId,
        },
      });
      return NextResponse.json({ status: "success", data: person });
    } else {
      return NextResponse.json({ status: "success", data: [] });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
