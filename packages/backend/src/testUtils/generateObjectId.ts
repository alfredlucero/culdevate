import mongoose from "mongoose";

export const generateObjectId = () => mongoose.Types.ObjectId();
export const generateObjectIdString = () => mongoose.Types.ObjectId().toString();
