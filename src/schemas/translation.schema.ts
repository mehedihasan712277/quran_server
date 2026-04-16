import { z } from "zod";

// reuse verse schema
const verseSchema = z.record(
    z.string().regex(/^verse_\d+$/, {
        message: "Key must be in format verse_1, verse_2, ...",
    }),
    z.string().min(1, { message: "Translation text is required" }),
);

// base schema
const translationSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    index: z.string().min(1, { message: "Index is required" }),
    verse: verseSchema,
    count: z.number().min(1, { message: "Count must be at least 1" }),
});

// create
export const createTranslationSchema = z.object({
    body: z.union([translationSchema, z.array(translationSchema).min(1)]),
});

// update
export const updateTranslationSchema = z.object({
    body: translationSchema.partial(),
});
