import { z } from "zod";

// base schema
const audioSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    index: z.number().min(0, { message: "Index must be a non-negative number" }),
    audioUrls: z.array(z.string().url({ message: "Each audio URL must be a valid URL" })).min(1, { message: "At least one audio URL is required" }),
});

// create (single or multiple)
export const createAudioSchema = z.object({
    body: z.union([audioSchema, z.array(audioSchema).min(1)]),
});

// update
export const updateAudioSchema = z.object({
    body: audioSchema.partial(),
});
