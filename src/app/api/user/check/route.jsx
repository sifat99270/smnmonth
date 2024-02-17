import { SendEmail } from "@/utilities/mail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { VerifyToken, createToken } from "@/utilities/token";
export async function POST(req, res) {
  try {
    const json = await req.json();
    const prisma = new PrismaClient();
    const count = await prisma.user.count({
      where: {
        email: json["email"],
      },
    });

    if (parseInt(count) === 0) {
      const code = Math.floor(Math.random() * 900000);
      let EmailText = `Your OTP Code is=${code}`;
      let EmailSubject = "Next News Verification Code";
      const send = await SendEmail(json["email"], EmailText, EmailSubject);
      if (send["accepted"].length > 0) {
        const create = await prisma.check.create({
          data: {
            firstName: json["firstName"],
            lastName: json["lastName"],
            email: json["email"],
            password: json["password"],
            otp: code.toString(),
          },
        });

        if (create["id"]) {
          const token = await createToken(create["id"], json["email"]);

         
        let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
         const cookieString = `check=${token}; expires=${expireDuration.toUTCString()}; path=/`;
          return NextResponse.json({
            status: "success",
            data: "please check otp",
            cookie:cookieString
          });
        } else {
          return NextResponse.json({
            status: "fail",
            data: "email allready taken",
          }
          );
        }
      } else {
        return NextResponse.json({
          status: "fail",
          data: "email not send",
        });
      }
    } else {
      return NextResponse.json({
        status: "fail",
        data: "email allready taken",
      });
    }
  } catch (e) {
    console.log(e)
    return NextResponse.json({ status: "fail", data: e });
  }
}

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(req.url);
    const test = searchParams.get("otp");
    const token = cookies().get("check")?.value;
    if (token) {
      const verify = await VerifyToken(token);
      if (verify["email"]) {
        const check = await prisma.check.findUnique({
          where: { email: verify["email"], otp: test },
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
                otp: test,
              },
            });
            if (del["id"]) {
              return NextResponse.json({
                status: "success",
                data: "registration successfully",
              });
            } else {
              await prisma.user.delete({
                where: {
                  email: create["email"],
                },
              });
              return NextResponse.json({
                status: "fail",
                data: "delete fail",
              });
            }
          } else {
            return NextResponse.json({
              status: "fail",
              data: "account create fail",
            });
          }
        } else {
          return NextResponse.json({ status: "fail", data: "check fail 2" });
        }
      } else {
        return NextResponse.json({ status: "fail", data: "check fail 2" });
      }
    } else {
      return NextResponse.json({ status: "fail", data: "check fail" });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
