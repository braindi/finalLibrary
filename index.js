import express from "express";
import mongoose from "mongoose";
import { config } from "process";
import bookRouter from "./routes/book.js"

config();

const app = express();
const mongoURL = process.env.DB_CONNECTION || "mongodb:localhost:27017/library";
mongoose.connect(mongoURL)
    .then((suc) => {
        console.log("mongodb connect");
    })
    .catch((err) => {
        console.log("can not connect mongodb");
        console.log(err);
        process.exit(1);
    })

app.use(express.json())

 app.use("/api/book",bookRouter);

let port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("app is listening");
})