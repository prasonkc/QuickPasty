import mongoose, { Schema, Document, Model } from "mongoose";

export interface Paste extends Document {
  paste_id: string;
  // user: mongoose.Types.ObjectId;
  userID: string,
  paste_title: string;
  paste_content: string;
  is_private?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PasteSchema = new Schema<Paste>(
  {
    paste_id: { type: String, required: true, unique: true },
    // user: { type: Schema.Types.ObjectId, ref: "QuickPastyUser", required: true }, 
    userID: {type: String, required: true, unique: false},
    paste_title: { type: String, required: true },
    paste_content: { type: String, required: true },
    // is_private: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const PasteModel: Model<Paste> =
  mongoose.models.Paste || mongoose.model<Paste>("Paste", PasteSchema);

export default PasteModel;
