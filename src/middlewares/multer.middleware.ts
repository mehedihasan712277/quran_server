import multer from "multer";

const storage = multer.memoryStorage(); // store files in memory
export const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB per file
});
