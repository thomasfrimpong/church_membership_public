import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  try {
    const { current_password, new_password } = await req.json();
    //console.log({ current_password, new_password });

    const email = session?.user.email;
    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 500 });
    }
    const passwordsMatch = await bcrypt.compare(
      current_password,
      user.password
    );

    if (!passwordsMatch) {
      return NextResponse.json(
        { message: "passwords do not match" },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error while updating password" },
      { status: 500 }
    );
  }
}
