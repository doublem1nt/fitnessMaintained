const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// local mongoose connection
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// online mongoose connection
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/maidenvoyage',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const db = require("./models")

// routes
require("./routes/apiPath")(app);
require("./routes/htmlPath")(app);
// app.use(require("./routes/apiPath.js"));
// app.use(require("./routes/htmlPath.js"))

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
