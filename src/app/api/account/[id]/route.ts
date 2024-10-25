import { ConnectWithMongoDB } from "@/essentials/ConnectWithMongoDB";
import { VerifyToken } from "@/functions/JWT";
import { User } from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: any }) => {
  try {
    const user_id = await params.id;
    // const user_id = await req.json();
    // console.log(user_id);

    await ConnectWithMongoDB();

    const data1: {
      name: string;
      username: string;
      email: string;
      phone: number;
    } = await req.json();
    const { name, username, email, phone } = data1;

    const update = await User.findById({ email });

    // console.log(id);

    return NextResponse.json(
      {
        message: "Updated Successfully",
        data1,
        // user_id
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
};
