import { Request, Response } from "express";
import AppError from "../utils/AppError";
import Upload from "../models/upload.model";
import { v2 as cloudinary } from "cloudinary";
import Client from "../models/client.model";

// CREATE client
export const createClient = async (req: Request, res: Response) => {
    const clients = await Client.insertMany(req.body);

    res.status(201).json({
        success: true,
        data: clients,
    });
};

// GET all clients
export const getAllClients = async (req: Request, res: Response) => {
    const clients = await Client.find();

    res.status(200).json({
        success: true,
        count: clients.length,
        data: clients,
    });
};

// UPDATE client
export const updateClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const client = await Client.findById(id);
    if (!client) {
        throw new AppError("Client not found", 404);
    }

    const currentLogoUrl = client.url;
    const newLogoUrl = updates.url;

    // If thumbnail changed
    if (newLogoUrl && currentLogoUrl !== newLogoUrl) {
        // Find old file instance
        const fileInstance = await Upload.findOne({ url: currentLogoUrl });
        if (fileInstance) {
            try {
                await cloudinary.uploader.destroy(fileInstance.publicId);
                await fileInstance.deleteOne();
            } catch (err) {
                throw new AppError("Failed to remove old thumbnail", 500);
            }
        }
    }

    // Now update client
    const updatedClient = await Client.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: updatedClient,
    });
};

// DELETE client
export const deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
        throw new AppError("Client not found", 404);
    }

    //collect logo url
    let fileUrls: string[] = [client.url];

    // Find Upload documents that match the URLs
    const uploadDocs = await Upload.find({ url: { $in: fileUrls } });

    // Extract publicIds for Cloudinary deletion
    const publicIds = uploadDocs.map((doc) => doc.publicId);

    try {
        // Delete files from Cloudinary
        let cloudinaryResult: { deleted: Record<string, string> } = {
            deleted: {},
        };

        if (publicIds.length > 0) {
            cloudinaryResult = await cloudinary.api.delete_resources(publicIds, {
                resource_type: "image",
            });
        }

        // Delete Upload documents from MongoDB
        await Upload.deleteMany({ url: { $in: fileUrls } });

        await Client.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error("❌ Error during client deletion:", err);
        throw new AppError("Failed to delete client or associated files", 500);
    }
};
