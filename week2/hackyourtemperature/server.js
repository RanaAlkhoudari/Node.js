const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  if (cityName.length === 0) {
    res.status(400);
    res.render("index", { weatherText: "City not found!" });
    return;
  }
  res.render("index", { weatherText: cityName });
});

app.listen(3000);
