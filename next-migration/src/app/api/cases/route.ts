import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Case from "@/models/Case";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const cases = await Case.find();
    return NextResponse.json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json({ error: "Failed to fetch cases" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newCase = new Case(body);
    await newCase.save();
    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    console.error("Error creating case:", error);
    return NextResponse.json({ error: "Failed to create case" }, { status: 500 });
  }
}
