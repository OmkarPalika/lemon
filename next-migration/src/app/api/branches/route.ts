import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Branch from "@/models/Branch";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const branches = await Branch.find();
    return NextResponse.json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    return NextResponse.json({ error: "Failed to fetch branches" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newBranch = new Branch(body);
    await newBranch.save();
    return NextResponse.json(newBranch, { status: 201 });
  } catch (error) {
    console.error("Error creating branch:", error);
    return NextResponse.json({ error: "Failed to create branch" }, { status: 500 });
  }
}
