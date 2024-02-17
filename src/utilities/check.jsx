import { PrismaClient } from "@prisma/client";
import { VerifyToken } from "@/utilities/token";
import { cookies } from "next/headers";
export default async function Checkotp(otp) {
  try {
    const prisma = new PrismaClient();
    const token = cookies().get("check")?.value;
    if (token) {
      const verify = await VerifyToken(token);
      if (verify["email"]) {
        const check = await prisma.check.findUnique({
          where: { email: verify["email"], otp: otp },
        });
        if (check["id"]) {
          const create = await prisma.user.create({
            data: {
              firstName: check["firstName"],
              lastName: check["lastName"],
              email: check["email"],
              password: check["password"],
              otp: "",
            },
          });

          if (create["id"]) {
            cookies().delete("check");
            const del = await prisma.check.delete({
              where: {
                email: create["email"],
                otp: otp,
              },
            });
            if (del["id"]) {
              return {
                status: "success",
                data: "registration successfully",
              };
            } else {
              await prisma.user.delete({
                where: {
                  email: create["email"],
                },
              });
              return {
                status: "fail",
                data: "delete fail",
              };
            }
          } else {
            return {
              status: "fail",
              data: "account create fail",
            };
          }
        } else {
          return { status: "fail", data: "check fail 2" };
        }
      } else {
        return { status: "fail", data: "check fail 2" };
      }
    } else {
      return { status: "fail", data: "check fail" };
    }
  } catch (e) {
    console.log(e);
    return { status: "fail", data: e };
  }
}
