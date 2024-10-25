import { ConnectWithMongoDB } from "@/essentials/ConnectWithMongoDB";
import { VerifyToken } from "@/functions/JWT";
import { User } from "@/models/Users";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    console.log("body-token",body);
    const data: any = await VerifyToken(body.token);
    await ConnectWithMongoDB();
    console.log("data",data);
    const UserData = await User.findById(data?.id).select("-password");

    if (!UserData) {
      return NextResponse.json({ message: "Does not exist" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Verified", data: UserData },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error?.message);
    return NextResponse.json(
      { error: error.message, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
