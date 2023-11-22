import bcrypt from "bcryptjs";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const { first_name, last_name, email, phone_number, church_id } =
      await req.json();

    const type_of_admin = "admin";

    const hashedPassword = await bcrypt.hash("changemenow", 10);
    await connectMongoDB();

    const res = await User.create({
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
      type_of_admin,
      church_id,
    });
    console.error(res);
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error occured while registering the user" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const church_id = session?.user.church_id;

  await connectMongoDB();
  const users = await User.find().populate("church_id").sort({ createdAt: -1 });

  return NextResponse.json(users, { status: 200 });
}

export async function PUT(req) {
  try {
    const { id, first_name, last_name, email, phone_number } = await req.json();

    await connectMongoDB();

    const res = await User.findByIdAndUpdate(id, {
      first_name,
      last_name,
      email,
      phone_number,
    });
    console.error(res);
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error occured while updating user" },
      { status: 500 }
    );
  }
}
