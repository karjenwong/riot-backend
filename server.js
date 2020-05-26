const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser");

const riot = require("./routes/riot");

app.use(bodyParser.json());
app.use(cors());
//routes
app.use("/riot", riot);


//test to see if it's working
app.post("/test", (req, res) => res.json({ test: "successful" }));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
