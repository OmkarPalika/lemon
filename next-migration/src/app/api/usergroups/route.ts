import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import UserGroup from "@/models/UserGroup";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const userGroups = await UserGroup.find();
    return NextResponse.json(userGroups);
  } catch (error) {
    console.error("Error fetching user groups:", error);
    return NextResponse.json({ error: "Failed to fetch user groups" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newUserGroup = new UserGroup(body);
    await newUserGroup.save();
    return NextResponse.json(newUserGroup, { status: 201 });
  } catch (error) {
    console.error("Error creating user group:", error);
    return NextResponse.json({ error: "Failed to create user group" }, { status: 500 });
  }
}
