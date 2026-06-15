import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  clientName: string;
  clientCode: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  isActive: number;
  createdBy?: number;
  createdOn?: Date;
  updatedOn?: Date;
}

const ClientSchema: Schema = new Schema(
  {
    clientName: { type: String, required: true },
    clientCode: { type: String, required: true, unique: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    country: { type: String },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
);

export default mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema);
