import { NowRequest, NowResponse } from "@now/node";
import connect from "../lib/db";

module.exports = async (req: NowRequest, res: NowResponse) => {
  console.log(req.query);
  // Connect to MongoDB and get the database
  const database = await connect();

  // Select the "data" weather collection from the database
  const weatherCollection = await database.collection("data");
  const weatherData = await weatherCollection
    .find()
    .limit(5)
    .toArray();
  console.log(weatherData);
  res.status(200).send(weatherData);
};
