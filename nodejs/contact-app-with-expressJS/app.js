const express = require("express");
const { loadContacts, findDetail, addData } = require("./utils/functions");
const app = express();
const port = 3000;

// use ejs
app.set("view engine", "ejs");

// built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // display generic file
  const datas = loadContacts();
  res.render("index", { title: "Home", datas });
});

app.get("/data/add", (req, res) => {
  res.render("add-contact", { title: "Add Contact" });
});

app.post("/data/add", (req, res) => {
  addData(req.body.name, req.body.phone, req.body.email);
  res.redirect("/");
});

app.get("/data/:name", (req, res) => {
  // display data details
  const detail = findDetail(req.params.name);
  res.render("detail", { title: "Data Detail", detail });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
