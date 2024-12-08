import createHttpError from "http-errors";
import userModal from "./userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    let newUser = "";

    if (!name || !email || !password) {
        const error = createHttpError(400, "All Fields are Required");
        return next(error);
    }

    try {
        const user = await userModal.findOne({ email });

        if (user) {
            const error = createHttpError(400, "User Already Exists..");
            return next(error);
        }
    } catch (err) {
        return next(createHttpError(500, "Error while Creating Error"), err);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        newUser = userModal.create({
            name,
            email,
            password: hashedPassword,
        });
    } catch (err) {
        return next(createHttpError(500, "Error while creating user"), err);
    }

    const token = jwt.sign({ sub: newUser._id }, config.jwt_secret, {
        expiresIn: "7d",
    });

    res.status(201).json({ accessToken: token });
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(createHttpError(400, "All Fields are Required"));
        }

        const user = await userModal.findOne({ email });

        if (!user) {
            return next(createHttpError(404, "Users Not Found"));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(
                createHttpError(401, "Usename or PassWord is incorrect")
            );
        }

        const token = jwt.sign({ sub: user._id }, config.jwt_secret, {
            expiresIn: "7d",
        });
        res.json({ accessToken: token });
    } catch (err) {
        return next(createHttpError(500, "interna error "), err);
    }
};

export { createUser, loginUser };
