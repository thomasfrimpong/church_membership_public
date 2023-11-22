import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Member from "@/models/member";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const church_id = session?.user.church_id;

  try {
    const { first_name, last_name, phone_number, address, decision, invitee } =
      await req.json();

    await connectMongoDB();
    const res = Member.create({
      first_name,
      last_name,
      phone_number,
      address,
      decision,
      invitee,
      church_id,
    });
    console.error(res);
    return NextResponse.json({ message: "Member registered" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error occured while registering the member" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  const church_id = session?.user.church_id;

  const type_of_admin = session?.user.type_of_admin;

  await connectMongoDB();

  if (type_of_admin == "admin") {
    const members = await Member.find({ church_id })
      .populate("church_id")

      .sort({ createdAt: -1 });

    return NextResponse.json({ members }, { status: 200 });
  } else {
    const members = await Member.find()
      .populate("church_id")

      .sort({ createdAt: -1 });

    return NextResponse.json({ members }, { status: 200 });
  }
}
export async function PUT(request) {
  const { first_name, last_name, phone_number, address, invitee, id } =
    await request.json();
  try {
    const response = await Member.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        phone_number,
        address,
        invitee,
      },
      {
        $set: {
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number,
          address: address,
          invitee: invitee,
        },
      }
    );
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json("Updated failed", { status: 500 });
  }
  // member.first_name = first_name;
}
