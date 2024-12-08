import { config as conf } from "dotenv";
conf();

const username = process.env.username;
const password = process.env.password;
const port = process.env.PORT || 3000;

const encodedUsername = encodeURIComponent(username);
const encodedPassword = encodeURIComponent(password);

const connectionStr = `mongodb+srv://${encodedUsername}:${encodedPassword}@cluster0.ptlqe.mongodb.net/eLib?retryWrites=true&w=majority&appName=Cluster0`;

const _config = {
    port: port,
    connectionString: connectionStr,
    env: process.env.NODE_ENV,
    jwt_secret: process.env.jwtSecret,
    cloudname: process.env.cloud_name,
    apikey: process.env.api_key,
    apisecret: process.env.api_secret,
};

export const config = Object.freeze(_config);
