import Express from "express";
import dbConnection from "./db/dbConnection.js";
import {} from "dotenv/config.js";
import cors from "cors";
import todoRouter from "./routes/todoRouter.js";

const app = Express();
app.use(cors());
app.use(Express.json());
app.use("/api", todoRouter);

const connection = () => {
  try {
    dbConnection(process.env.MONGO_URL);
    app.listen(3001, (req, res) => {
      console.log("Server is running at port 3001");
    });
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

connection();
