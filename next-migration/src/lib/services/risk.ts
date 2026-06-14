// Port of the core risk calculation logic from CustomerServices.cs
export function calculateCustomerRisk(riskScore: number): string {
    let riskStatus = "LOWRISK";
    const lowRange = 3 * 1.49;
    const midRange = 3 * 2.24;
    const highRange = 3 * 3;

    if (riskScore > lowRange && riskScore <= midRange) {
        riskStatus = "MEDIUMRISK";
    } else if (riskScore > midRange && riskScore <= highRange) {
        riskStatus = "HIGHRISK";
    }

    return riskStatus;
}
