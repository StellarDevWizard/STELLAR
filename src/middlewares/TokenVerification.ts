import { NextResponse } from "next/server";
import { VerifyToken } from "../functions/JWT";

export const TokenVerification = async (
  req: any,
  // next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({
        message: "Authorization header is missing or invalid",
        auth: "invalid",
      },{status:401});
    }

    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const decoded:any = await VerifyToken(token);
     
        if (decoded === "jwt malformed" || decoded === "invalid token")
          return NextResponse.json({
            message: "Token malformed",
            auth: "invalid",
          },{status:401});
        req.body.id = decoded.id;
        // next();
      } catch (error:any) {
        console.log(error);
        if (error.message === "jwt expired") {
          return NextResponse.json({
            message: "Token expired",
            expiredAt: error.expiredAt,
            auth: "invalid",
          },{status:401});
        } else {
          return NextResponse.json({ message: "Failed to authenticate token", auth: "invalid" },{status:401});
        }
      }
    } else {
      return NextResponse
        .json({ message: "Failed to authenticate token", auth: "invalid" },{status:401});
    }
  } catch (error) {
    console.log(error);
  }
};