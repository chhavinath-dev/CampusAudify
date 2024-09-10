const connectToMongo = require("./db");
const express = require("express");
var app = express()
var cors = require('cors')
connectToMongo();



app.use(cors())
app.use(express.json())
const port = 8000;

//
// app.use(express.json())
app.use("/api/auth", require('./routes/auth.js'))
app.use("/api/audio", require('./routes/audio.js'))
app.listen(port, () => {
  console.log(`Server of CampusAudify listening on port ${port}`);
})
