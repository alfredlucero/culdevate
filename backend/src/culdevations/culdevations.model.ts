import mongoose from "mongoose";

export interface Culdevation {
  culdevator: string;
  title: string;
  description: string;
  score: number;
}

// Culdevation is the typing from the TS perspective that we will be using on the client-side
// Extending mongoose.Document allows us to call things like save(), findById(), and other Model functions
export interface CuldevationModel extends Culdevation, mongoose.Document {}

const culdevationSchema = new mongoose.Schema({
  // This seems redundant but it's necessary to define the schema because TypeScript
  // does not preserve run-time type information and the object model in
  // the database does not need to match the in-memory representation exactly
  culdevator: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  score: { type: Number, required: true },
});

const CuldevationModel = mongoose.model<CuldevationModel>(
  "Culdevation", // Collection will be called Culdevations
  culdevationSchema, // Schema to validate objects against
);

export default CuldevationModel;
