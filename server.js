import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {
    try {
        await connectDB();
        const port = config.port || 3000;

        app.listen(port, () => {
            console.log(`---- Listening on Port: ${port} ----`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
