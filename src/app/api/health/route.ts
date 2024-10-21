import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return NextResponse.json(
      {
        message: "Server is live !",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
      message: "Server is dead !",
    },{ status: 500 });
  }
};