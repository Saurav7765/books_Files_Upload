import createHttpError from "http-errors";
import cloudinary from "../config/cloudnary.js";
import path from "path";

const createBook = async (req, res, next) => {
    try {
        console.log("Files", req.files);

        const files = req.files || {};

        const coverImageMimeType = req.files.coverImage[0].mimetype
            .split("/")
            .at(-1);
        const fileName = files.coverImage[0].filename;

        const filepath = path.resolve(
            process.cwd(),
            "public/data/uploads",
            fileName
        );

        const uploadresult = await cloudinary.uploader.upload(filepath, {
            filename_override: fileName,
            folder: "book-covers",
            format: coverImageMimeType,
        });

        const bookFiles = files.file[0].filename ? files.file[0].filename : "";

        const bookfilepath = path.resolve(
            process.cwd(),
            "public/data/uploads",
            bookFiles
        );

        try {
            const bookfileupload = cloudinary.uploader.upload(bookfilepath, {
                resource_type: "raw",
                filename_override: bookFiles,
                folder: "book-pdfs",
                format: "pdf",
            });

            console.log("bookfileupload", bookfileupload);

            console.log("uploadresult", uploadresult);
        } catch (error) {
            next(createHttpError(500, "some internal error"), error);
        }

        res.json({ message: " File Uploaded " });
    } catch (error) {
        return next(createHttpError(404, "Some Internal Error "), error);
    }
};

export { createBook };
