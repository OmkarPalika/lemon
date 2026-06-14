import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  productCode: string;
  productName: string;
  finalRiskScore?: string;
  prodRiskScoreSum?: number;
  prodRiskScoreCount?: number;
  riskScoreBeforeOverride?: string;
  dateOfAssessment?: Date;
  clientId?: number;
  createdBy?: number;
  version?: number;
  createdOn?: Date;
}

const ProductSchema: Schema = new Schema(
  {
    productCode: { type: String, required: true },
    productName: { type: String, required: true },
    finalRiskScore: { type: String },
    prodRiskScoreSum: { type: Number },
    prodRiskScoreCount: { type: Number },
    riskScoreBeforeOverride: { type: String },
    dateOfAssessment: { type: Date },
    clientId: { type: Number },
    createdBy: { type: Number },
    version: { type: Number, default: 1 },
    createdOn: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: false },
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
