import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Department from "@/models/Department";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const departments = await Department.find();
    return NextResponse.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newDepartment = new Department(body);
    await newDepartment.save();
    return NextResponse.json(newDepartment, { status: 201 });
  } catch (error) {
    console.error("Error creating department:", error);
    return NextResponse.json({ error: "Failed to create department" }, { status: 500 });
  }
}
