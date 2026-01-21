const express = require("express");
const app = express();
const port = 3000;

// use ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // display generic file
  const datas = [
    { name: "Baron", age: 18 },
    { name: "Yoru", age: 28 },
    { name: "Yor", age: 30 },
  ];
  res.render("index", { title: "Home", datas });
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
