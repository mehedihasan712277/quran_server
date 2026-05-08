import { Request, Response } from "express";
import AppError from "../utils/AppError";
import Audio from "../models/audio.model";

// CREATE audio (single or multiple)
export const createAudio = async (req: Request, res: Response) => {
    const audios = await Audio.insertMany(Array.isArray(req.body) ? req.body : [req.body]);

    res.status(201).json({
        success: true,
        data: audios,
    });
};

// GET all audios
export const getAllAudios = async (req: Request, res: Response) => {
    const audios = await Audio.find();

    res.status(200).json({
        success: true,
        count: audios.length,
        data: audios,
    });
};

// GET single audio by index
export const getSingleAudio = async (req: Request, res: Response) => {
    const { index } = req.params;

    if (!index || Array.isArray(index)) {
        throw new AppError("Invalid index", 400);
    }

    const audio = await Audio.findOne({ index: Number(index) });

    if (!audio) {
        throw new AppError("Audio not found", 404);
    }

    res.status(200).json({
        success: true,
        data: audio,
    });
};

// UPDATE audio
export const updateAudio = async (req: Request, res: Response) => {
    const { id } = req.params;

    const audio = await Audio.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!audio) {
        throw new AppError("Audio not found", 404);
    }

    res.status(200).json({
        success: true,
        data: audio,
    });
};

// DELETE audio
export const deleteAudio = async (req: Request, res: Response) => {
    const { id } = req.params;

    const audio = await Audio.findById(id);

    if (!audio) {
        throw new AppError("Audio not found", 404);
    }

    await Audio.findByIdAndDelete(id);

    res.status(204).send();
};
