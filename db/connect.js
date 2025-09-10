import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Atlas connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;



// import mongoose from "mongoose";

// const connectDB = async (url) => {
//   try {
//     let db = {
//       dbName: "FoodApp",
//     };
//     await mongoose.connect(url, db);
//     console.log("connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default connectDB;


