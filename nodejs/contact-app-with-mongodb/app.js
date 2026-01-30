import "./utils/conn.js";
import Data from "./model/contact.js";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// flash config
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(flash());

app.get("/", async (req, res) => {
  const datas = await Data.find();
  res.render("index", { title: "Home", datas, msg: req.flash("msg") });
});

app.get("/data/:name", async (req, res) => {
  const detail = await Data.findOne({ name: req.params.name });
  res.render("detail", { title: "Detail", detail });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.listen(port, () => {
  console.log(`Contact App with MongoDB on http://localhost:${port}`);
});
