const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // display generic file
  // res.send("Hello World!"); // plain text
  res.sendFile("./index.html", { root: __dirname }); // file
});

app.get("/json", (req, res) => {
  // display json
  res.json({ name: "baron" });
});

app.get("/user/:id", (req, res) => {
  // display param value
  res.send(`Param value is ${req.params.id }`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
