import mongoose, { Schema, Document } from "mongoose";

export interface IClientCase extends Document {
  customerReferenceID: string;
  firstName: string;
  lastName: string;
  clientId: number;
  status: string;
  riskScore?: number;
  matchScore?: string;
  isActive: number;
  createdBy?: number;
  createdOn?: Date;
  updatedOn?: Date;
}

const ClientCaseSchema: Schema = new Schema(
  {
    customerReferenceID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    clientId: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    riskScore: { type: Number, default: 0 },
    matchScore: { type: String },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
);

export default mongoose.models.ClientCase || mongoose.model<IClientCase>("ClientCase", ClientCaseSchema);
