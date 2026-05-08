import { Schema, Document, model, Model } from "mongoose";

export interface IAudio extends Document {
    name: string;
    index: number;
    audioUrls: string[];
}

const AudioSchema = new Schema<IAudio>(
    {
        name: { type: String, required: true },
        index: { type: Number, required: true },
        audioUrls: { type: [String], required: true },
    },
    { timestamps: true },
);

const Audio: Model<IAudio> = model<IAudio>("Audio", AudioSchema);

export default Audio;
