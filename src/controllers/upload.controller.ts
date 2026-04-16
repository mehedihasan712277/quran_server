import { Request, Response } from "express";
import Upload, { IUpload } from "../models/upload.model";
import AppError from "../utils/AppError";
import { uploadToCloudinary } from "../utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";

interface DeleteFilesRequestBody {
    ids: string[];
}

// Single file upload
export const uploadSingleFile = async (req: Request, res: Response) => {
    if (!req.file) throw new AppError("No file uploaded", 400);

    try {
        const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        const upload = await Upload.create({
            originalName: req.file.originalname,
            url: result.secure_url,
            publicId: result.public_id,
        });

        res.status(201).json({ success: true, data: upload });
    } catch (error: any) {
        throw new AppError(error.message || "File upload failed", 500);
    }
};

// Multiple files upload
export const uploadMultipleFiles = async (req: Request, res: Response) => {
    if (!req.files || !(req.files instanceof Array)) throw new AppError("No files uploaded", 400);

    try {
        const files = req.files as Express.Multer.File[];
        const uploadedFiles = [];

        for (const file of files) {
            const result = await uploadToCloudinary(file.buffer, file.originalname);
            const upload = await Upload.create({
                originalName: file.originalname,
                url: result.secure_url,
                publicId: result.public_id,
            });
            uploadedFiles.push(upload);
        }

        res.status(201).json({ success: true, data: uploadedFiles });
    } catch (error: any) {
        throw new AppError(error.message || "Files upload failed", 500);
    }
};

// Delete single file
export const deleteSingleFile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = await Upload.findById(id);
    if (!file) throw new AppError("File not found", 404);

    await cloudinary.uploader.destroy(file.publicId);
    await file.deleteOne();

    res.status(200).json({ success: true, message: "File deleted" });
};

//Delete multiple files
export const deleteMultipleFiles = async (req: Request<{}, {}, DeleteFilesRequestBody>, res: Response) => {
    const { ids } = req.body;

    if (!ids || !ids.length) {
        throw new AppError("No file IDs provided", 400);
    }

    // Fetch files from MongoDB
    const files: IUpload[] = await Upload.find({ _id: { $in: ids } });
    if (!files.length) {
        throw new AppError("No matching files found", 404);
    }

    const publicIds: string[] = files.map((f) => f.publicId);
    let cloudinaryResult: { deleted: Record<string, string> } = { deleted: {} };

    try {
        // Bulk delete from Cloudinary (explicit type = "image")
        cloudinaryResult = await cloudinary.api.delete_resources(publicIds, {
            resource_type: "image",
        });
    } catch (err) {
        console.error("❌ Cloudinary deletion error:", err);
        // We allow MongoDB deletion to continue, but flag Cloudinary issue
    }

    // Delete from MongoDB
    await Upload.deleteMany({ _id: { $in: ids } });

    // Prepare response summary
    const deletedCount = Object.values(cloudinaryResult.deleted || {}).filter((status) => status === "deleted").length;

    res.status(200).json({
        success: true,
        message: `${files.length} file(s) deleted from database, ${deletedCount} successfully deleted from Cloudinary`,
        cloudinaryResult,
    });
};

// Get all uploaded files
export const getAllFiles = async (_req: Request, res: Response) => {
    const uploads = await Upload.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: uploads });
};
