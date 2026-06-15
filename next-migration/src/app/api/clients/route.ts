import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Client from "@/models/Client";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const clients = await Client.find();
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newClient = new Client(body);
    await newClient.save();
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
