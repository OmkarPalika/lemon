import mongoose, { Schema, Document } from "mongoose";

export interface ICodesMaster extends Document {
  ccType?: string;
  ccCode?: string;
  ccName?: string;
  ccCodeCatg?: string;
  ccDetails?: string;
  ccFlexi1?: string;
  ccFlexi2?: string;
  ccFlexi3?: string;
  ccActiveYn: boolean;
  ccClientId?: number;
}

const CodesMasterSchema: Schema = new Schema(
  {
    ccType: { type: String },
    ccCode: { type: String },
    ccName: { type: String },
    ccCodeCatg: { type: String },
    ccDetails: { type: String },
    ccFlexi1: { type: String },
    ccFlexi2: { type: String },
    ccFlexi3: { type: String },
    ccActiveYn: { type: Boolean, default: true },
    ccClientId: { type: Number },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CodesMaster || mongoose.model<ICodesMaster>("CodesMaster", CodesMasterSchema);
