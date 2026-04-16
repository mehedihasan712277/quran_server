import { z } from "zod";

// Image URL validation
const imageUrlSchema = z
    .string()
    .min(1, { message: "Client image URL is required" })
    .regex(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i, {
        message: "Client URL must be a valid image URL (jpg, jpeg, png, webp)",
    });

// Single client schema
const clientSchema = z.object({
    url: imageUrlSchema,
});

// ✅ Create: supports single OR multiple
export const createClientSchema = z.object({
    body: z.union([clientSchema, z.array(clientSchema).min(1)]),
});

// ✅ Update (only single)
export const updateClientSchema = z.object({
    body: z.object({
        url: imageUrlSchema.optional(),
    }),
});
