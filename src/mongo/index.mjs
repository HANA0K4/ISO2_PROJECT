import mongoose from 'mongoose';
import { MONGO_URI } from '../commons/env.mjs';

// eslint-disable-next-line import/prefer-default-export
export const startConnection = async () => {
  const url = encodeURI(MONGO_URI);
  await mongoose.connect(url);
};

export const closeConnection = async () => {
  await mongoose.connection.close();
};
