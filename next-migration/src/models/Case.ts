import mongoose, { Schema, Document } from "mongoose";

export interface ICase extends Document {
  customerReferenceID: string;
  firstName: string;
  lastName: string;
  nationality?: string;
  dob?: Date;
  customerType?: string;
  status: string; // E.g., Pending, Reviewed
  riskScore?: number;
  matchScore?: string;
  clientId?: number;
  isActive: number;
  createdBy?: number;
  createdOn?: Date;
  updatedOn?: Date;
}

const CaseSchema: Schema = new Schema(
  {
    customerReferenceID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationality: { type: String },
    dob: { type: Date },
    customerType: { type: String },
    status: { type: String, default: "Pending" },
    riskScore: { type: Number, default: 0 },
    matchScore: { type: String },
    clientId: { type: Number },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
);

export default mongoose.models.Case || mongoose.model<ICase>("Case", CaseSchema);
