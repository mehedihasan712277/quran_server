import { Schema, Document, model, Model } from "mongoose";

export interface ITranslation extends Document {
    name: string;
    index: string;
    verse: Record<string, string>; // verse_1, verse_2...
    count: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const TranslationSchema = new Schema<ITranslation>(
    {
        name: { type: String, required: true },
        index: { type: String, required: true },

        // dynamic keys like verse_1, verse_2
        verse: {
            type: Map,
            of: String,
            required: true,
        },

        count: { type: Number, required: true },
    },
    { timestamps: true },
);

const Translation: Model<ITranslation> = model<ITranslation>("Translation", TranslationSchema);

export default Translation;
