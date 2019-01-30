import * as mongoose from 'mongoose';
import * as uuidv4 from 'uuid/v4';

export const CatSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      default: uuidv4,
    },
    name: { type: String, trim: true, required: true },
    age: { type: Number, required: true },
    breed: { type: String, trim: true, required: true },
  },
  { timestamps: true },
);
