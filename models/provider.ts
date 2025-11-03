import mongoose, { Schema, Document, Model } from "mongoose";

export interface QuickPastyOAuth extends Document {
  _id: string;
  name?: string;
  email?: string;
  provider: string;
  providerId?: string;
  pastes?: string[];
}

const QuickPastyOAuthSchema = new Schema<QuickPastyOAuth>(
  {
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    provider: { type: String, required: true },
    providerId: { type: String, sparse: true },
    pastes: [{ type: Schema.Types.ObjectId, ref: "Paste" }],
  },
  { timestamps: true }
);

const UserOAuth: Model<QuickPastyOAuth> =
  mongoose.models.QuickPastyOAuth || mongoose.model<QuickPastyOAuth>("QuickPastyOAuth", QuickPastyOAuthSchema);

export default UserOAuth;
