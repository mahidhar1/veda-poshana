import mongoose from "mongoose";
let alreadyDone = false;

export async function ensureDbConnected() {
  if (alreadyDone) {
    return;
  }
  alreadyDone = true;
  try {
    let res = await mongoose.connect(
      "mongodb+srv://admin:admin@myatlasclusteredu.eskei1a.mongodb.net/?retryWrites=true&w=majority",
      { dbName: "veda-poshana" },
    );
    //console.log(res.connections[0].collections);
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
}
