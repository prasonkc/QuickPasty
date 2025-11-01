import mongoose, { Schema, Document, Model } from "mongoose";

export interface QuickLinkyUser extends Document {
    _id: string
    email: string;
    password: string;
    username?: string;
    pastes?: string[];
}

const QuickLinkyUserSchema = new Schema<QuickLinkyUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        username: { type: String, unique: true, sparse: true },
        pastes: [{ type: Schema.Types.ObjectId, ref: "Paste" }],
    },
    { timestamps: true }
);

const User: Model<QuickLinkyUser> =
    mongoose.models.QuickLinkyUser || mongoose.model<QuickLinkyUser>("QuickLinkyUser", QuickLinkyUserSchema);

export default User;
