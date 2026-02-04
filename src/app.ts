import express from "express";
import environment from "./config/environment";
import connectDB from "./db-connect";
import xss from "./middlewares/xss";
import helmet from "helmet"
connectDB();
const app = express();
app.use(express.json());
app.use(xss);
app.use(helmet)

app.listen(environment.PORT, () => {
  console.log(`Server running on port ${environment.PORT}`);
});
