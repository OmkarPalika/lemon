import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import IdentityType from "@/models/IdentityType";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const identityTypes = await IdentityType.find();
    return NextResponse.json(identityTypes);
  } catch (error) {
    console.error("Error fetching identity types:", error);
    return NextResponse.json({ error: "Failed to fetch identity types" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newIdentityType = new IdentityType(body);
    await newIdentityType.save();
    return NextResponse.json(newIdentityType, { status: 201 });
  } catch (error) {
    console.error("Error creating identity type:", error);
    return NextResponse.json({ error: "Failed to create identity type" }, { status: 500 });
  }
}
