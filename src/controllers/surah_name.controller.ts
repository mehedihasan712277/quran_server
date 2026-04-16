import { Request, Response } from "express";
import AppError from "../utils/AppError";
import SurahName from "../models/surah_name.model";

// CREATE surah names
export const createSurahName = async (req: Request, res: Response) => {
    const surahNames = await SurahName.insertMany(req.body);

    res.status(201).json({
        success: true,
        data: surahNames,
    });
};

// GET all surah names
export const getAllSurahNames = async (req: Request, res: Response) => {
    const surahNames = await SurahName.find();

    res.status(200).json({
        success: true,
        count: surahNames.length,
        data: surahNames,
    });
};

// GET single surah name by index
export const getSurahNameByIndex = async (req: Request, res: Response) => {
    const { index } = req.params;

    if (!index || Array.isArray(index)) {
        throw new AppError("Invalid index", 400);
    }

    const surahName = await SurahName.findOne({ index });

    if (!surahName) {
        throw new AppError("Surah not found", 404);
    }

    res.status(200).json({
        success: true,
        data: surahName,
    });
};

// DELETE surah name
export const deleteSurahName = async (req: Request, res: Response) => {
    const { id } = req.params;

    const surahName = await SurahName.findById(id);

    if (!surahName) {
        throw new AppError("Surah not found", 404);
    }

    await SurahName.findByIdAndDelete(id);

    res.status(204).send();
};
