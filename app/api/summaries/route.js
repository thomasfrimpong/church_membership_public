import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Member from "@/models/member";

export async function GET() {
  const session = await getServerSession(authOptions);
  const church_id = session?.user.church_id;
  console.log(church_id);

  await connectMongoDB();
  const number_of_members = await Member.countDocuments({
    church_id,
  });
  const number_of_stable_members = await Member.countDocuments({
    church_id,
    decision: "stay",
  });
  const number_of_visitors = await Member.countDocuments({
    church_id,
    decision: "visit",
  });

  return NextResponse.json({
    number_of_members,
    number_of_stable_members,
    number_of_visitors,
  });
}
