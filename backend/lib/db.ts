import { MongoClient, Db } from "mongodb";
import url from "url";

// Create cached connection variable
let cachedDb: Db | null = null;

const connect = async () => {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // Prepare variable for client connection
  let client;

  // If no connection is cached, create a new one
  // Error if the client connection fails
  const mongoDBURI = process.env.MONGODB_URI;
  console.log(mongoDBURI);
  try {
    client = await MongoClient.connect(mongoDBURI, { useNewUrlParser: true });
  } catch (err) {
    throw new Error("[MongoDB] Connection Error: " + err);
  }

  // Select the database through the connection,
  // using the database path of the connection string
  const parsedMongoDBURI = url.parse(mongoDBURI);
  if (!parsedMongoDBURI.pathname) {
    parsedMongoDBURI.pathname = "Couldn't parse the MongoDB URI... This will fail to connect to db.";
  }
  console.log("Pathname substr: ", parsedMongoDBURI.pathname.substr(1));
  // This needs to be the DB name yikes
  const database: Db = await client.db("sample_weatherdata");

  // Cache the database connection and return the connection
  cachedDb = database;
  return database;
};

export default connect;
