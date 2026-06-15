import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import CustomerMaster from "@/models/CustomerMaster";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const customers = await CustomerMaster.find();
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customer master:", error);
    return NextResponse.json({ error: "Failed to fetch customer master" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newCustomer = new CustomerMaster(body);
    await newCustomer.save();
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer master:", error);
    return NextResponse.json({ error: "Failed to create customer master" }, { status: 500 });
  }
}
