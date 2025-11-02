import mongoose, { Schema, Document, Model } from "mongoose";

export interface QuickLinkyUser extends Document {
    _id: string
    username?: string;
    email: string;
    password: string;
    pastes?: string[];
}

const QuickLinkyUserSchema = new Schema<QuickLinkyUser>(
    {
        username: { type: String, unique: true, sparse: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        pastes: [{ type: Schema.Types.ObjectId, ref: "Paste" }],
    },
    { timestamps: true }
);

const User: Model<QuickLinkyUser> =
    mongoose.models.QuickLinkyUser || mongoose.model<QuickLinkyUser>("QuickLinkyUser", QuickLinkyUserSchema);

export default User;
