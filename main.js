const fs = require("fs");
const webdriver = require("selenium-webdriver");
const chromedriver = require("chromedriver");
const chrome = require("selenium-webdriver/chrome");
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));

const chromeCapabilities = webdriver.Capabilities.chrome();
chromeCapabilities.set("chromeOptions", { args: ["--headless"] });

const options = new chrome.Options();
options.addArguments("headless");
options.addArguments("disable-gpu");

const driver = new webdriver.Builder()
  .forBrowser("chrome")
  .withCapabilities(chromeCapabilities)
  .setChromeOptions(options)
  .build();

function getURLParams(url) {
  var vars = {};
  var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
}

function search(query) {
  return driver
    .get("https://music.youtube.com/search?q=song " + query)
    .then(() => {
      return driver.wait(
        webdriver.until.elementLocated(
          webdriver.By.css(
            "ytmusic-shelf-renderer:nth-child(2) ytmusic-play-button-renderer"
          )
        ),
        5000
      );
    })
    .then(element => {
      return element.click();
    })
    .then(() => {
      return driver.getCurrentUrl().then(url => {
        const params = getURLParams(url);
        driver.get("https://music.youtube.com"); // to not play music
        return params["v"];
      });
    });
}

app.get("/", (req, res, next) => {
  search(req.query.q)
    .then(response => {
      res.json({ id: response });
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.listen(3000, () => {
  console.log("Server started http://localhost:3000");
});
