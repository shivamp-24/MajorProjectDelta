const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Review.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6829b5aa9e5382701e40f889",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
