import { z } from 'zod'

const envSchema = z.object({
    MONGO_URL: z.string().nonempty(),
    JWT_SECRET: z.string().nonempty(),
    JWT_TIMES: z.string().nonempty(),
    CLOUD_NAME: z.string().nonempty(),
    API_KEY: z.string().nonempty(),
    API_SECRET: z.string().nonempty(),
})

export const env = envSchema.parse(process.env)