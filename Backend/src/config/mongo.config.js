import mongoose from "mongoose";

async function main() {
  await mongoose.connect(process.env.ATLAS_URL);
}

const connectDB = (msg) =>
  main()
    .then(() => {
      console.log(`connection to db successful from : ${msg}`);
    })
    .catch((err) => {
      console.log(err);
    });

export default connectDB;
