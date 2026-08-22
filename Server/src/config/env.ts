import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    PORT: z.string(),
    CLIENT_URI: z.url("CLIENT_URI must be a valid connection string!"),
    MONGO_URI: z.url("MONGO_URI must be a valid connection string!"),
    REDIS_URI: z.url("REDIS must be a valid connection string!"),
});

const _env = envSchema.safeParse(process.env);

if(!_env.success) {
    console.error("Invalid enviroment variables", _env.error);
    process.exit(1);
}

export const env = _env.data;