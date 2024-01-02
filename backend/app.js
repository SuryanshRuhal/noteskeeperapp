const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
const {errorHandler,notFound}= require("./middleware.js/errormiddleware");
const cors=require("cors");

dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);


const connectDb = async () => {
    try {
      console.log("MongoDB Connection String:", process.env.MONGO_URL);
      const connect = await mongoose.connect(process.env.MONGO_URL);
      console.log("Server is Connected to Database");
    } catch (err) {
      console.log("Server is NOT connected to Database", err.message);
    }
  };
  connectDb();

  app.use(express.json());

  const userroutes = require("./routes/userroute");
  const noteroutes = require("./routes/noteroutes");

  app.use("/user",userroutes);
  app.use("/note",noteroutes);
// deployment code starts 
const _dirname1= path.resolve();
if (process.env.NODE_ENV ==="production") {
  app.use(express.static(path.join(_dirname1,"/frontend/build")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname1,"frontend", "build", "index.html"));
  });
} else {
  app.get("/",(req,res)=>{
    res.send("API is running successfully");
  });
}
/// deployment code ends
  app.use(notFound);
  app.use(errorHandler);

  app.get("/", (req, res) => {
    res.send("API is running123");
  });

  
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(PORT));