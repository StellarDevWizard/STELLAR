import { ConnectWithMongoDB } from "@/essentials/ConnectWithMongoDB";
import { encrypt } from "@/functions/EncryptionDecryption";
import { CreateToken } from "@/functions/JWT";
import { User } from "@/models/Users";
import { NextResponse } from "next/server";

export const POST = async (req:any) => {
  try {
    const body: { email: string; password: string } = await req.json();

    const { email, password } = body;
    console.log(encrypt(password))    
    await ConnectWithMongoDB();
    const isEmailExists = await User.findOne({
      email,
      password: await encrypt(password),
    });

    if (!isEmailExists) {
      return NextResponse.json(
        {
          message: "Email or password is worng",
        },
        { status: 401 }
      );
    }

    console.log(body);

    const token = await CreateToken(
      { id: isEmailExists?._id },
      "7d"
    );


      return NextResponse.json(
        { message: "Sign In Successful", token },
        { status: 200 }
      );

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: "Internal Server Error !",
      status: 500,
    });
  }
};