import mongoose, { Schema, Document } from "mongoose";

export interface ICountry extends Document {
  code: string;
  name: string;
  description?: string;
  riskScore?: number;
  riskRating?: number;
  risk?: string;
  unCode?: string;
  fatfRiskRating?: string;
  fatfRiskScore?: string;
  isoCode3digit?: string;
  isActive: boolean;
  clientId?: number;
}

const CountrySchema: Schema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    riskScore: { type: Number },
    riskRating: { type: Number },
    risk: { type: String },
    unCode: { type: String },
    fatfRiskRating: { type: String },
    fatfRiskScore: { type: String },
    isoCode3digit: { type: String },
    isActive: { type: Boolean, default: true },
    clientId: { type: Number },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Country || mongoose.model<ICountry>("Country", CountrySchema);
