import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Country from "@/models/Country";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const countries = await Country.find();
    return NextResponse.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newCountry = new Country(body);
    await newCountry.save();
    return NextResponse.json(newCountry, { status: 201 });
  } catch (error) {
    console.error("Error creating country:", error);
    return NextResponse.json({ error: "Failed to create country" }, { status: 500 });
  }
}
