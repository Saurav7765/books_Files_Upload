import { v2 as cloudinary } from "cloudinary";
import { config } from "./config.js";

cloudinary.config({
    cloud_name: config.cloudname,
    api_key: config.apikey,
    api_secret: config.apisecret,
});

export default cloudinary;
