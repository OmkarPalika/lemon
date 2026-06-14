import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
// Note: In a full DB port, this would map exactly to the CASELOG collection.
import Case from "@/models/Case";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log(`Started API call from API scheduler: ${new Date().toISOString()}`);
    console.log(`Pending Cases check for CaseId: ${body.CASEID}`);

    await connectToDatabase();

    // Migrated the logic that checks for pending cases and deletes them (as per the C# code)
    const pendingCases = await Case.find({ customerReferenceID: body.CASEID });

    if (pendingCases && pendingCases.length > 0) {
        for (const item of pendingCases) {
            await Case.findByIdAndDelete(item._id);
            console.log(`Deleted pending case: ${item._id}`);
        }
    }

    return NextResponse.json({
        success: true,
        deletedCount: pendingCases.length,
        message: "Pending cases processed"
    }, { status: 200 });

  } catch (error: any) {
    console.error("Pending cases check failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
