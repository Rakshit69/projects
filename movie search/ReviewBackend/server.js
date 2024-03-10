import express from "express";
import cors from "cors"
import router from "./api/reviews.route.js";
const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());//application will take the request in json format

app.use("/api/v1/reviews", router);
// app.use("*", (req, res) =>
//     res.status(404).json({ message: "Not found!" }))

export default app;