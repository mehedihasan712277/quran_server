import { Schema, Document, model, Model } from "mongoose";

export interface IClient extends Document {
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ClientSchema = new Schema<IClient>(
    {
        url: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

const Client: Model<IClient> = model<IClient>("Client", ClientSchema);

export default Client;
