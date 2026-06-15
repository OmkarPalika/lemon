import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import ClientCase from "@/models/ClientCase";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const clientCases = await ClientCase.find();
    return NextResponse.json(clientCases);
  } catch (error) {
    console.error("Error fetching client cases:", error);
    return NextResponse.json({ error: "Failed to fetch client cases" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newClientCase = new ClientCase(body);
    await newClientCase.save();
    return NextResponse.json(newClientCase, { status: 201 });
  } catch (error) {
    console.error("Error creating client case:", error);
    return NextResponse.json({ error: "Failed to create client case" }, { status: 500 });
  }
}
