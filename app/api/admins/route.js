import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const church_id = session?.user.church_id;

  await connectMongoDB();
  const users = await User.find({ church_id })
    .populate("church_id")
    .sort({ createdAt: -1 });

  return NextResponse.json(users, { status: 200 });
}
