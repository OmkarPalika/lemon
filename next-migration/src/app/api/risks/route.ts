import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Risk from "@/models/Risk";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const risks = await Risk.find();
    return NextResponse.json(risks);
  } catch (error) {
    console.error("Error fetching risks:", error);
    return NextResponse.json({ error: "Failed to fetch risks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newRisk = new Risk(body);
    await newRisk.save();
    return NextResponse.json(newRisk, { status: 201 });
  } catch (error) {
    console.error("Error creating risk record:", error);
    return NextResponse.json({ error: "Failed to create risk record" }, { status: 500 });
  }
}
