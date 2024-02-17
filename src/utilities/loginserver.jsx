import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { createToken } from "./token";
export default async function Loginserver(email, password){
    try {
        const prisma = new PrismaClient();
        const check = await prisma.user.findUnique({
          where: {
            email: email,
            password: password,
          },
        });
        console.log(check);
        if (check["id"]) {
          const token = await createToken(check["id"], email);
          //let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
          //const cookieString = `token=${token}; expires=${expireDuration.toUTCString()}; path=/`;
          const response ={
            status: "success",
            data: "successfully login",
            cookie:token
          }
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
          return {
            status: "fail",
            data: "check password or email",
          }
        }
      } catch (e) {
        return { status: "fail", data: e }
      }
}