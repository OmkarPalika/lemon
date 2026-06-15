import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import CodesMaster from "@/models/CodesMaster";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const codes = await CodesMaster.find();
    return NextResponse.json(codes);
  } catch (error) {
    console.error("Error fetching codes master:", error);
    return NextResponse.json({ error: "Failed to fetch codes master" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newCode = new CodesMaster(body);
    await newCode.save();
    return NextResponse.json(newCode, { status: 201 });
  } catch (error) {
    console.error("Error creating code master:", error);
    return NextResponse.json({ error: "Failed to create code master" }, { status: 500 });
  }
}
