import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const users = await User.find({ isDeleted: 0 }).select("-password");
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    // Hash password before saving
    if (body.password) {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
    }

    const newUser = new User(body);
    await newUser.save();

    // Return without password
    const userObject = newUser.toObject();
    delete userObject.password;

    return NextResponse.json(userObject, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
