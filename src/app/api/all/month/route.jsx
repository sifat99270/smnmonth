import { VerifyToken } from "@/utilities/token";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    let header = headers();
    const id = parseInt(header.get("id"));
    const data = await prisma.mounth.findMany({
      where: {
        userId: id,
      },
    });
    return NextResponse.json({ status: "success", data: data });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: [] });
  }
}
