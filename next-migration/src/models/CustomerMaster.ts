import mongoose, { Schema, Document } from "mongoose";

export interface ICustomerMaster extends Document {
  customerReferenceID: string;
  customerId?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  nationality?: string;
  dob?: Date;
  customerType?: string;
  customerIdType?: string;
  customerIdNumber?: string;
  passportId?: string;
  passportIssueDate?: Date;
  passportExpiryDate?: Date;
  emiratesIdNumber?: string;
  emiratesIdIssueDate?: Date;
  emiratesIdExpiryDate?: Date;
  clientId?: number;
  createdBy?: number;
  createdOn?: Date;
  updatedOn?: Date;
}

const CustomerMasterSchema: Schema = new Schema(
  {
    customerReferenceID: { type: String, required: true },
    customerId: { type: String },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    nationality: { type: String },
    dob: { type: Date },
    customerType: { type: String },
    customerIdType: { type: String },
    customerIdNumber: { type: String },
    passportId: { type: String },
    passportIssueDate: { type: Date },
    passportExpiryDate: { type: Date },
    emiratesIdNumber: { type: String },
    emiratesIdIssueDate: { type: Date },
    emiratesIdExpiryDate: { type: Date },
    clientId: { type: Number },
    createdBy: { type: Number },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
);

export default mongoose.models.CustomerMaster || mongoose.model<ICustomerMaster>("CustomerMaster", CustomerMasterSchema);
