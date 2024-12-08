import express from "express";
import globalErrorHandler from "./middlewares/globalError.js";
import userRouter from "./user/userRouter.js";
import bookRouter from "./book/bookRouter.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Application is working fine...." });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Global Error Handler should be the last middleware
app.use(globalErrorHandler);

export default app;
