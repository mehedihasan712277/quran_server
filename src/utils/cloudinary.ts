import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";

export interface CloudinaryUploadResult {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder?: string;
    original_filename?: string;
}

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (buffer: Buffer, filename: string): Promise<CloudinaryUploadResult> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "sakib/uploads", // ✅ separate folder for this project
                resource_type: "image", // ✅ restrict to images
                public_id: `${Date.now()}-${filename.split(".")[0]}`,
                use_filename: true,
                unique_filename: false,
                overwrite: false,
            },
            (error, result) => {
                if (error) return reject(error);
                if (!result) return reject(new Error("No result returned from Cloudinary"));
                resolve(result as unknown as CloudinaryUploadResult);
            },
        );
        stream.end(buffer);
    });
};
