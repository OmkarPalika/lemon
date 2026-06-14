import mongoose, { Schema, Document } from "mongoose";

export interface IBlacklist extends Document {
  matchName: string;
  matchScore?: number;
  matchUid?: string;
  matchCategory?: string;
  matchType?: string;
  nationality?: string;
  matchIdNumber?: string;
  matchDob?: string;
  clientId?: number;
}

const BlacklistSchema: Schema = new Schema(
  {
    matchName: { type: String, required: true },
    matchScore: { type: Number },
    matchUid: { type: String },
    matchCategory: { type: String },
    matchType: { type: String },
    nationality: { type: String },
    matchIdNumber: { type: String },
    matchDob: { type: String },
    clientId: { type: Number }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blacklist || mongoose.model<IBlacklist>("Blacklist", BlacklistSchema);
