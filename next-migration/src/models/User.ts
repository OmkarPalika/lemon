import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fname: string;
  lname: string;
  empCode: string;
  userName: string;
  password?: string;
  remarks?: string;
  designationId?: number;
  departmentId?: number;
  userGroupId?: number;
  branchId?: number;
  countryId?: number;
  identityTypeId?: number;
  isActive: number;
  isDeleted: number;
  isBlocked: number;
  createdBy?: number;
  updatedBy?: number;
  createdOn?: Date;
  updatedOn?: Date;
  otp?: number;
  email?: string;
  clientId?: number;
  isSuperAdmin?: number;
}

const UserSchema: Schema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    empCode: { type: String },
    userName: { type: String, required: true, unique: true },
    password: { type: String },
    remarks: { type: String },
    designationId: { type: Number },
    departmentId: { type: Number },
    userGroupId: { type: Number },
    branchId: { type: Number },
    countryId: { type: Number },
    identityTypeId: { type: Number },
    isActive: { type: Number, default: 1 },
    isDeleted: { type: Number, default: 0 },
    isBlocked: { type: Number, default: 0 },
    createdBy: { type: Number },
    updatedBy: { type: Number },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
    otp: { type: Number },
    email: { type: String },
    clientId: { type: Number },
    isSuperAdmin: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
