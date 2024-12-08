import createHttpError from "http-errors";
import cloudinary from "../config/cloudnary.js";
import path from "path";

const createBook = async (req, res, next) => {
    try {
        console.log("Files", req.files);

        // Ensure files exist and check if coverImage and file are provided
        const files = req.files || {};
        const coverImage = files.coverImage ? files.coverImage[0] : null;
        const bookFile = files.file ? files.file[0] : null;

        // Handle missing cover image
        if (!coverImage) {
            return next(createHttpError(400, "Cover image is required"));
        }

        const coverImageMimeType = coverImage.mimetype.split("/").at(-1);
        const fileName = coverImage.filename;

        const filepath = path.resolve(
            process.cwd(),
            "public/data/uploads",
            fileName
        );

        const uploadresult = await cloudinary.uploader.upload(filepath, {
            filename_override: fileName,
            folder: "saurav-book-covers",
            format: coverImageMimeType,
        });

        // Handle missing book file (PDF)
        if (!bookFile) {
            return next(createHttpError(400, "Book file is required"));
        }

        const bookFiles = bookFile.filename;
        const bookfilepath = path.resolve(
            process.cwd(),
            "public/data/uploads",
            bookFiles
        );

        try {
            const bookfileupload = await cloudinary.uploader.upload(
                bookfilepath,
                {
                    resource_type: "raw",
                    filename_override: bookFiles,
                    folder: "saurav-book-pdfs",
                    format: "pdf",
                }
            );

            console.log("bookfileupload", bookfileupload);
            console.log("uploadresult", uploadresult);

            // Respond with a success message
            res.json({ message: "Files Uploaded Successfully" });
        } catch (error) {
            return next(
                createHttpError(500, "Error uploading book file", {
                    cause: error,
                })
            );
        }
    } catch (error) {
        return next(
            createHttpError(500, "Some internal error occurred", {
                cause: error,
            })
        );
    }
};

export { createBook };
