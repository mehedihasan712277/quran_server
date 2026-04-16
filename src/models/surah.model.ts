import { Schema, Document, model, Model } from "mongoose";

// Juz Subdocument Interface
interface IJuz {
    index: string;
    verse: {
        start: string;
        end: string;
    };
}

// Main Document Interface
export interface ISurah extends Document {
    index: string;
    name: string;
    verse: Record<string, string>; // dynamic keys like verse_1, verse_2
    count: number;
    juz: IJuz[];
    createdAt?: Date;
    updatedAt?: Date;
}

// Schema
const SurahSchema = new Schema<ISurah>(
    {
        index: { type: String, required: true },
        name: { type: String, required: true },

        // Dynamic object (verse_1, verse_2, ...)
        verse: {
            type: Map,
            of: String,
            required: true,
        },

        count: { type: Number, required: true },

        juz: [
            {
                index: { type: String, required: true },
                verse: {
                    start: { type: String, required: true },
                    end: { type: String, required: true },
                },
            },
        ],
    },
    { timestamps: true },
);

const Surah: Model<ISurah> = model<ISurah>("Surah", SurahSchema);

export default Surah;
