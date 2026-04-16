import { z } from "zod";

// juz schema (reuse)
const juzSchema = z.object({
    index: z.string().min(1, { message: "Juz index is required" }),
    verse: z.object({
        start: z.string().min(1, { message: "Start verse is required" }),
        end: z.string().min(1, { message: "End verse is required" }),
    }),
});

// base schema
const surahNameSchema = z.object({
    place: z.string().min(1, { message: "Place is required" }),
    type: z.string().min(1, { message: "Type is required" }),
    count: z.number().min(1, { message: "Count must be at least 1" }),

    title: z.string().min(1, { message: "Title is required" }),
    titleAr: z.string().min(1, { message: "Arabic title is required" }),

    index: z.string().min(1, { message: "Index is required" }),
    pages: z.string().min(1, { message: "Pages is required" }),

    juz: z.array(juzSchema).min(1, { message: "At least one juz required" }),
});

// create
export const createSurahNameSchema = z.object({
    body: z.union([surahNameSchema, z.array(surahNameSchema).min(1)]),
});

// update
export const updateSurahNameSchema = z.object({
    body: surahNameSchema.partial(),
});
