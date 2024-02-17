import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { SendEmail } from "@/utilities/mail";
import { createToken } from "@/utilities/token";

export default async function Sign( firstName, lastName, email, password ) {
  try {
    const prisma = new PrismaClient();
    const count = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!count) {
      const code = Math.floor(Math.random() * 900000);
      let EmailText = `Your OTP Code is=${code}`;
      let EmailSubject = "Next News Verification Code";
      const send = await SendEmail(email, EmailText, EmailSubject);
      if (send["accepted"].length > 0) {
        const create = await prisma.check.create({
          data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            otp: code.toString(),
          },
        });
        console.log(create);
        if (create["id"]) {
          const token = await createToken(create["id"], email);
          
          return {
            status: "success",
            data: "please check otp",
            cookie:token,
          };
        } else {
          return {
            status: "fail",
            data: "there was an error",
          };
        }
      } else {
        return {
          status: "fail",
          data: "there was an error",
        };
      }
    } else {
      return {
        status: "fail",
        data: "there was an error",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      status: "fail",
      data: "there was an error",
    };
  }
}
