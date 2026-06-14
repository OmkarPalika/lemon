import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Corporate from "@/models/Corporate";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const corporates = await Corporate.find();
    return NextResponse.json(corporates);
  } catch (error) {
    console.error("Error fetching corporates:", error);
    return NextResponse.json({ error: "Failed to fetch corporates" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newCorporate = new Corporate(body);
    await newCorporate.save();
    return NextResponse.json(newCorporate, { status: 201 });
  } catch (error) {
    console.error("Error creating corporate:", error);
    return NextResponse.json({ error: "Failed to create corporate" }, { status: 500 });
  }
}
