const express = require("express");
const exphbs = require("express-handlebars");
const axios = require("axios");
const API_KEY = require("./sources/keys.json").API_KEY;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", async (req, res) => {
  try {
    const cityName = req.body.cityName;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`
    );
    const temperature = response.data.main.temp.toFixed(0);
    res.render("index", {
      weatherText: `The temperature in ${cityName} is ${temperature}°C!`,
    });
  } catch {
    res.render("index", { weatherText: "City is not found!" });
  }
});

app.listen(3000);
