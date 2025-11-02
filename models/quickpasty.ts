import mongoose, { Schema, Document, Model } from "mongoose";

export interface QuickPasty extends Document {
    _id: string
    username?: string;
    email: string;
    password: string;
    pastes?: string[];
}

const QuickPastySchema = new Schema<QuickPasty>(
    {
        username: { type: String, unique: true, sparse: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        pastes: [{ type: Schema.Types.ObjectId, ref: "Paste" }],
    },
    { timestamps: true }
);

const User: Model<QuickPasty> =
    mongoose.models.QuickPasty || mongoose.model<QuickPasty>("QuickPasty", QuickPastySchema);

export default User;
