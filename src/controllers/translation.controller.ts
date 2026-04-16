import { Request, Response } from "express";
import AppError from "../utils/AppError";
import Translation from "../models/translation.model";

// CREATE translation
export const createTranslation = async (req: Request, res: Response) => {
    const translations = await Translation.insertMany(req.body);

    res.status(201).json({
        success: true,
        data: translations,
    });
};

// GET all translations
export const getAllTranslations = async (req: Request, res: Response) => {
    const translations = await Translation.find();

    res.status(200).json({
        success: true,
        count: translations.length,
        data: translations,
    });
};

// GET translation by surah index
export const getTranslationByIndex = async (req: Request, res: Response) => {
    const { index } = req.params;

    if (!index || Array.isArray(index)) {
        throw new AppError("Invalid index", 400);
    }

    const translation = await Translation.findOne({ index });

    if (!translation) {
        throw new AppError("Translation not found", 404);
    }

    res.status(200).json({
        success: true,
        data: translation,
    });
};

// DELETE translation
export const deleteTranslation = async (req: Request, res: Response) => {
    const { id } = req.params;

    const translation = await Translation.findById(id);

    if (!translation) {
        throw new AppError("Translation not found", 404);
    }

    await Translation.findByIdAndDelete(id);

    res.status(204).send();
};
