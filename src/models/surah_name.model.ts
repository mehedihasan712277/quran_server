import { Schema, Document, model, Model } from "mongoose";

// Juz subdocument interface
interface IJuz {
    index: string;
    verse: {
        start: string;
        end: string;
    };
}

// Main Surah interface
export interface ISurahName extends Document {
    place: string;
    type: string;
    count: number;
    title: string;
    titleAr: string;
    index: string;
    pages: string;
    juz: IJuz[];
    createdAt?: Date;
    updatedAt?: Date;
}

const SurahNameSchema = new Schema<ISurahName>(
    {
        place: { type: String, required: true }, // Mecca / Medina
        type: { type: String, required: true }, // Makkiyah / Madaniyah
        count: { type: Number, required: true }, // total ayahs

        title: { type: String, required: true }, // English name
        titleAr: { type: String, required: true }, // Arabic name

        index: { type: String, required: true, unique: true }, // "001"
        pages: { type: String, required: true },

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

const SurahName: Model<ISurahName> = model<ISurahName>("SurahName", SurahNameSchema);

export default SurahName;
