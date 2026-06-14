import { NextResponse } from "next/server";
import { calculateCustomerRisk } from "@/lib/services/risk";
import { checkFuzzyMatch } from "@/lib/services/fuzzy";
import connectToDatabase from "@/lib/db/mongodb";
import Blacklist from "@/models/Blacklist";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log(`Started API call from API scheduler: ${new Date().toISOString()}`);
    console.log(`CaseId: ${body.CASEID}`);
    console.log(`CustomerName: ${body.CUSTOMERFULLNAME}`);

    await connectToDatabase();

    const riskStatus = calculateCustomerRisk(body.RISKSCORE || 0);

    // Fetch all blacklist records (In real prod, this should be paginated/indexed,
    // but mimicking offline logic which loads names into memory for fuzzy screening)
    const blacklistRecords = await Blacklist.find().select("matchName");

    let hasMatch = false;
    let matchedName = "";

    for(const record of blacklistRecords) {
        if(checkFuzzyMatch(body.CUSTOMERFULLNAME, record.matchName)) {
            hasMatch = true;
            matchedName = record.matchName;
            break;
        }
    }

    return NextResponse.json({
        success: true,
        caseId: body.CASEID,
        riskStatus,
        fuzzyMatchFound: hasMatch,
        matchedRecord: hasMatch ? matchedName : null,
        message: "Customer screened successfully"
    }, { status: 200 });

  } catch (error: any) {
    console.error("Screening failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
