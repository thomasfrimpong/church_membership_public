import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Church from "@/models/church";

export async function POST(req: any) {
  try {
    const {
      church_name,
      location,
      email,
      phone_number,
      brand_colour_1,
      brand_colour_2,
    } = await req.json();
    console.log(
      church_name,
      location,
      email,
      phone_number,
      brand_colour_1,
      brand_colour_2
    );
    await connectMongoDB();

    const res = await Church.create({
      church_name,
      location,
      email,
      phone_number,
      brand_colour_1,
      brand_colour_2,
    });
    console.log(res);
    return NextResponse.json({ message: "Church registered" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error occured while adding the church" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  const churches = await Church.find().sort({ createdAt: -1 });
  return NextResponse.json({ churches }, { status: 200 });
}
