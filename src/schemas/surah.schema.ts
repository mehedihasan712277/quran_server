import { z } from "zod";

// verse object validation (dynamic keys)
const verseSchema = z.record(
    z.string().regex(/^verse_\d+$/, {
        message: "Key must be in format verse_1, verse_2, ...",
    }),
    z.string().min(1, { message: "Verse text is required" }),
);

// juz schema
const juzSchema = z.object({
    index: z.string().min(1, { message: "Juz index is required" }),
    verse: z.object({
        start: z.string().min(1, { message: "Start verse is required" }),
        end: z.string().min(1, { message: "End verse is required" }),
    }),
});

// base schema
const surahSchema = z.object({
    index: z.string().min(1, { message: "Index is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    verse: verseSchema,
    count: z.number().min(1, { message: "Count must be at least 1" }),
    juz: z.array(juzSchema).min(1, { message: "At least one juz required" }),
});

// create (single or multiple)
export const createSurahSchema = z.object({
    body: z.union([surahSchema, z.array(surahSchema).min(1)]),
});

// update
export const updateSurahSchema = z.object({
    body: surahSchema.partial(),
});
