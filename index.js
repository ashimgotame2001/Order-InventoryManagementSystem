const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const AuthRouter = require('./routes/authRoutes');
const ProfileRouter = require('./routes/profileInfoRoutes')
const authenticated = require('./middleware/authenticate');

const app = express();
const corsOptions = require("./config/corsOptions");
const connectDb = require("./config/databaseConnection");
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
require("dotenv").config();
app.use(logger);
app.use('/auth',AuthRouter)
app.use('/api/v1',ProfileRouter)

app.get('/',authenticated, (req, res) => {
  res.send('Hello World!');
});

connectDb();
app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Database Connected")
  app.listen(PORT, () => console.log(`Server Listening in port ${PORT}`));
});
mongoose.connection.on('error', err =>{
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t\t${err.syscall}\t\t${err.hostname}`,'mongoErrLog.log')
} )
