import mongoose from "mongoose";

export const setupDatabase = () => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

  // In order to chain mongoose requests with .then/.catch or use async/await
  mongoose.Promise = global.Promise;
  // To avoid deprecation warnings for using findOneAndUpdate or findOneAndDelete
  mongoose.set("useFindAndModify", false);

  mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
    useNewUrlParser: true,
  });

  mongoose.connection.on("connected", function() {
    console.log("Connected to MongoDB instance!");
  });

  mongoose.connection.on("error", function(err) {
    console.error("Failed to connect to MongoDB instance: ", err);
  });

  mongoose.connection.on("disconnected", function() {
    console.log("Disconnected from MongoDB instance!");
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log("Mongoose default connection is disconnected due to application termination!");
      process.exit(0);
    });
  });
};
