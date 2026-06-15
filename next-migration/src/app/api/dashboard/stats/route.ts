import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Case from "@/models/Case";
import User from "@/models/User";
import Client from "@/models/Client";
import CustomerMaster from "@/models/CustomerMaster";
import Risk from "@/models/Risk";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const [totalCases, totalUsers, totalClients, totalCustomers, totalRisks] = await Promise.all([
      Case.countDocuments(),
      User.countDocuments({ isDeleted: 0 }),
      Client.countDocuments(),
      CustomerMaster.countDocuments(),
      Risk.countDocuments()
    ]);

    return NextResponse.json({
      cases: totalCases,
      users: totalUsers,
      clients: totalClients,
      customers: totalCustomers,
      risks: totalRisks
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
