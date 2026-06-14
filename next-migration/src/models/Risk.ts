import mongoose, { Schema, Document } from "mongoose";

export interface IRisk extends Document {
  customerCode: string;
  customerName: string;
  dateOfAssessment?: Date;
  address?: string;
  finalRiskScore?: string;
  riskScoreSum?: number;
  riskScoreCount?: number;
  riskScoreBeforeOverride?: string;
  mainNationalityTxt?: string;
  isWhiteListed?: string;
  clientId?: number;
  createdBy?: number;
  version?: number;
  customerType?: string;
  remarks?: string;
  riskOverRide?: string;
  type?: string;
  productReference?: string;
  productValue?: number;
  riskComments?: string;
  caseVersion?: number;
  createdOn?: Date;
  updatedOn?: Date;
}

const RiskSchema: Schema = new Schema(
  {
    customerCode: { type: String, required: true },
    customerName: { type: String, required: true },
    dateOfAssessment: { type: Date },
    address: { type: String },
    finalRiskScore: { type: String },
    riskScoreSum: { type: Number },
    riskScoreCount: { type: Number },
    riskScoreBeforeOverride: { type: String },
    mainNationalityTxt: { type: String },
    isWhiteListed: { type: String },
    clientId: { type: Number },
    createdBy: { type: Number },
    version: { type: Number, default: 1 },
    customerType: { type: String },
    remarks: { type: String },
    riskOverRide: { type: String },
    type: { type: String },
    productReference: { type: String },
    productValue: { type: Number },
    riskComments: { type: String },
    caseVersion: { type: Number },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
);

export default mongoose.models.Risk || mongoose.model<IRisk>("Risk", RiskSchema);
