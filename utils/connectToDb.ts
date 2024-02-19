import mongoose from "mongoose";

function connectToDb() {
  if (mongoose.connections[0].readyState) {
    // console.log("it was connected :)))");

    return;
  }
  mongoose.connect("mongodb://localhost:27017/refresh-token");
  // console.log("connected :))))");
}

export default connectToDb;
