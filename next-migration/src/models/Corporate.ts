import mongoose, { Schema, Document } from "mongoose";

export interface ICorporate extends Document {
  customerId?: string;
  fullName: string;
  dateOfIncorporation?: string;
  placeOfIncorporation?: string;
  entityTypeTxt?: string;
  corporateWebsite?: string;
  telephone?: string;
  email?: string;
  threshold?: number;
  vatRegistrationNumber?: string;
  fundSourceTxt?: string;
  businessType?: string;
  productName?: string;
  deliveryChannelName?: string;
  pepStatus?: string;
  address?: string;
  country?: string;
  emirate?: string;
  city?: string;
  poBox?: string;
  licenseNumber?: string;
  licenseIssueDate?: string;
  licenseIssuingAuthority?: string;
  licenseExpiryDate?: string;
  placeOfIssue?: string;
  businessActivity?: string;
  licenseTypeTxt?: string;
  remarks?: string;
  pepName?: string;
  pepTitle?: string;
  pepType?: number;
  isPep?: string;
  modeOfPayment?: string;
  clientId?: number;
  isActive: number;
  createdBy?: number;
  createdOn?: Date;
  updatedOn?: Date;
}

const CorporateSchema: Schema = new Schema(
  {
    customerId: { type: String },
    fullName: { type: String, required: true },
    dateOfIncorporation: { type: String },
    placeOfIncorporation: { type: String },
    entityTypeTxt: { type: String },
    corporateWebsite: { type: String },
    telephone: { type: String },
    email: { type: String },
    threshold: { type: Number },
    vatRegistrationNumber: { type: String },
    fundSourceTxt: { type: String },
    businessType: { type: String },
    productName: { type: String },
    deliveryChannelName: { type: String },
    pepStatus: { type: String },
    address: { type: String },
    country: { type: String },
    emirate: { type: String },
    city: { type: String },
    poBox: { type: String },
    licenseNumber: { type: String },
    licenseIssueDate: { type: String },
    licenseIssuingAuthority: { type: String },
    licenseExpiryDate: { type: String },
    placeOfIssue: { type: String },
    businessActivity: { type: String },
    licenseTypeTxt: { type: String },
    remarks: { type: String },
    pepName: { type: String },
    pepTitle: { type: String },
    pepType: { type: Number },
    isPep: { type: String },
    modeOfPayment: { type: String },
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

export default mongoose.models.Corporate || mongoose.model<ICorporate>("Corporate", CorporateSchema);
