import dotenv from 'dotenv';

dotenv.config();
// eslint-disable-next-line import/prefer-default-export
export const PORT = process.env.PORT || 5001;
export const {
  MONGO_URI, MINIO_HOST, MINIO_ACCESS_KEY, MINIO_SECRET_KEY,
} = process.env;
