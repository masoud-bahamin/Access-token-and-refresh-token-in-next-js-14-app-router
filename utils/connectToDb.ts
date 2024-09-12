import mongoose from "mongoose";

function connectToDb() {
  if (mongoose.connections[0].readyState) {
    // console.log("it was connected :)))");

    return;
  }
  mongoose.connect("mongodb+srv://bahaminwp:bahamin1364@bahamincluster.zht7zml.mongodb.net/refresh-token");
  // console.log("connected :))))");
}

export default connectToDb;
