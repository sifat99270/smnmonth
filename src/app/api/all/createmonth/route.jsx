import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const json = await req.json();
    const prisma = new PrismaClient();
    const header = headers();
    const id = header.get("id");
    const data = await prisma.mounth.create({
      data: {
        name: json["name"],
        userId: parseInt(id),
      },
    });
    return NextResponse.json({ status: "success", data: data });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}