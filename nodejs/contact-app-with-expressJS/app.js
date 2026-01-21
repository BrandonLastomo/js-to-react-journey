const express = require("express");
const { loadContacts, findDetail } = require("./utils/functions");
const app = express();
const port = 3000;

// use ejs
app.set("view engine", "ejs");

// built-in middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  // display generic file
  const datas = loadContacts();
  res.render("index", { title: "Home", datas });
});

app.get("/data/:name", (req, res) => {
  // display data details
  const detail = findDetail(req.params.name);
  res.render("detail", { title: "Data Detail", detail });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/json", (req, res) => {
  // display json
  res.json({ name: "baron" });
});

app.get("/user/:id", (req, res) => {
  // display param value
  res.send(`Param value is ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
