import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Member from "@/models/member";

export async function POST(req: any) {
  const { query_param } = await req.json();
  console.log(query_param);

  await connectMongoDB();

  const members = await Member.find({
    $or: [
      { first_name: { $regex: query_param, $options: "i" } },
      { last_name: { $regex: query_param, $options: "i" } },
      // { invitee: { $regex: query_param, $options: "i" } },
      // { decision: { $regex: query_param, $options: "i" } },
      // { phone_number: { $regex: query_param, $options: "i" } },
      // { address: { $regex: query_param, $options: "i" } },
    ],
  })

    .populate("church_id")
    .sort({ createdAt: -1 });

  // console.log(members);
  return NextResponse.json({ members }, { status: 200 });
}
