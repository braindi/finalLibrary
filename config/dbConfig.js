import mongoose from "mongoose";

export const connectToDB = () => {
    const mongoURL = process.env.DB_CONNECTION || "mongodb://localhost:27017/library";
    mongoose.connect(mongoURL)
        .then((suc) => {
            console.log("mongodb connect");
        })
        .catch((err) => {
            console.log("can not connect mongodb");
            console.log(err);
            process.exit(1);
        })
}