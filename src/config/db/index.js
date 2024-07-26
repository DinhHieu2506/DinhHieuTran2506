import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://hieumap2506:250604hieu@hieuu.upqzgvp.mongodb.net/?retryWrites=true&w=majority&appName=Hieuu";

class Connection {

  constructor() {
    // Init a MongoClient with a MongoClientOptions object to set the Stable API version
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  async connect() {
    try {
      // Connect the client to the server
      console.log("Connecting to MongoDB...");
      await this.client.connect();
      
      // Test connection
      // await client.db("postss").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      // Return the database
      return await this.client.db("postss");
    } catch (e) {
      console.error(e);
    }
  }

  async close() {
    await this.client.close();
    console.log("Closed MongoDB connection");
  }
}

// export client
export default new Connection;
