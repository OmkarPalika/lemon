import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import VisaType from "@/models/VisaType";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const visaTypes = await VisaType.find();
    return NextResponse.json(visaTypes);
  } catch (error) {
    console.error("Error fetching visa types:", error);
    return NextResponse.json({ error: "Failed to fetch visa types" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newVisaType = new VisaType(body);
    await newVisaType.save();
    return NextResponse.json(newVisaType, { status: 201 });
  } catch (error) {
    console.error("Error creating visa type:", error);
    return NextResponse.json({ error: "Failed to create visa type" }, { status: 500 });
  }
}
