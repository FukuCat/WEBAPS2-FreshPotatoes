let express = require("express");
let router = require("./router.js");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));
app.use("/api", router);

app.use("*", function(req, res) {
    res.send("Resource not found (404).");
});

//db init
mongoose.connect("mongodb://localhost/moviereview", {
    useMongoClient: true
});

mongoose.promise = Promise;

app.listen(3000, function() {
    console.log("Server started at PORT 3000");
});
