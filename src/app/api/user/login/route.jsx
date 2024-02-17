
import { createToken } from "@/utilities/token";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const json = await req.json();
    const prisma = new PrismaClient();
    const check = await prisma.user.findUnique({
      where: {
        email: json["email"],
        password: json["password"],
      },
    });
    if (check["id"]) {
      const token = await createToken(check["id"], json["email"]);
      //let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
      //const cookieString = `token=${token}; expires=${expireDuration.toUTCString()}; path=/`;
      const response = NextResponse.json({
        status: "success",
        data: "successfully login",
      });
      cookies().set('token', token, {
        name: "token",
        value: token,
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
        path: "/"
      })
      // response.cookies.set({
      //   name: "token",
      //   value: token,
      //   httpOnly: true,
      //   maxAge: 60 * 60 * 24,
      //   sameSite: "strict",
      //   path: "/",
      // });
      return response;
    } else {
      return NextResponse.json({
        status: "fail",
        data: "check password or email",
      });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
