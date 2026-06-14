import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Designation from "@/models/Designation";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const designations = await Designation.find();
    return NextResponse.json(designations);
  } catch (error) {
    console.error("Error fetching designations:", error);
    return NextResponse.json({ error: "Failed to fetch designations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newDesignation = new Designation(body);
    await newDesignation.save();
    return NextResponse.json(newDesignation, { status: 201 });
  } catch (error) {
    console.error("Error creating designation:", error);
    return NextResponse.json({ error: "Failed to create designation" }, { status: 500 });
  }
}
