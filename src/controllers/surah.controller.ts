import { Request, Response } from "express";
import AppError from "../utils/AppError";
import Surah from "../models/surah.model";

// CREATE surah (single or multiple)
export const createSurah = async (req: Request, res: Response) => {
    const surahs = await Surah.insertMany(req.body);

    res.status(201).json({
        success: true,
        data: surahs,
    });
};

// GET all surahs
export const getAllSurahs = async (req: Request, res: Response) => {
    const surahs = await Surah.find();

    res.status(200).json({
        success: true,
        count: surahs.length,
        data: surahs,
    });
};

// GET single surah by index
export const getSingleSurah = async (req: Request, res: Response) => {
    const { index } = req.params;

    if (!index || Array.isArray(index)) {
        throw new AppError("Invalid index", 400);
    }

    const surah = await Surah.findOne({ index });

    if (!surah) {
        throw new AppError("Surah not found", 404);
    }

    res.status(200).json({
        success: true,
        data: surah,
    });
};

// DELETE surah
export const deleteSurah = async (req: Request, res: Response) => {
    const { id } = req.params;

    const surah = await Surah.findById(id);

    if (!surah) {
        throw new AppError("Surah not found", 404);
    }

    await Surah.findByIdAndDelete(id);

    res.status(204).send();
};
