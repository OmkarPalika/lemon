import mongoose, { Schema, Document } from "mongoose";

export interface IBranch extends Document {
  code: string;
  name: string;
  description?: string;
  isActive: number;
  createdBy?: number;
  updatedBy?: number;
  createdOn?: Date;
  updatedOn?: Date;
  clientId?: number;
}

const BranchSchema: Schema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number },
    updatedBy: { type: Number },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
    clientId: { type: Number },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
);

export default mongoose.models.Branch || mongoose.model<IBranch>("Branch", BranchSchema);
