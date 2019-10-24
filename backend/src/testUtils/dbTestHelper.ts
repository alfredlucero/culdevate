import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// This helper is intended to be used for integration tests
// i.e. testing dao and routes while interacting with an in-memory mongodb instance
class DbTestHelper {
  server = new MongoMemoryServer();

  // Start server and establish connection to in-memory mongodb
  async startDb() {
    const mongoUri = await this.server.getConnectionString();
    await mongoose.connect(
      mongoUri,
      {
        useNewUrlParser: true,
      },
      err => {
        if (err) console.error(err);
      },
    );

    // In order to chain mongoose requests with .then/.catch or use async/await
    mongoose.Promise = global.Promise;
    // To avoid deprecation warnings for using findOneAndUpdate or findOneAndDelete
    mongoose.set("useFindAndModify", false);
  }

  // Close connection and stop in-memory mongodb
  async stopDb() {
    await mongoose.disconnect();
    await this.server.stop();
  }

  // Clean up the in-memory mongodb by dropping all the collections and indices
  async cleanUpDb() {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      await collection.drop();
    }
  }
}

export default DbTestHelper;
