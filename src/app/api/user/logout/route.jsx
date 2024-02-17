import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";



export async function POST() {
    const header = headers();
    const id = header.get('id')
    if (id) {
        const cookie = cookies().delete('token');
        console.log(cookie)
        return NextResponse.json({ status: "success", data: "logout success" })
    } else {
        return NextResponse.json({ status: "fail", data: "login first" })
    }
}