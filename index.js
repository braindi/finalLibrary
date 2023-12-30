import express from "express";
import { config } from "dotenv";
import bookRouter from "./routes/book.js";
import { connectToDB } from "./config/dbConfig.js";
import userRouter from "./routes/user.js";

config();
connectToDB();
const app = express();

app.use(express.json())

app.use("/api/book", bookRouter);
app.use("/api/user", userRouter)

app.use((err, req, res, next) => {
    res.status(res.statusCode || 500)
    res.send(err.message || "התרחשה תקלה")
})

let port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`app is listening port ${port}`);
})