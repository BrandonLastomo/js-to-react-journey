const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  loadContacts,
  findContact,
  addData,
  findPhone,
} = require("./utils/functions");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const app = express();
const port = 3000;

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

// use ejs
app.set("view engine", "ejs");

// built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // display generic file
  const datas = loadContacts();
  res.render("index", { title: "Home", datas, msg: req.flash("msg") });
});

app.get("/data/add", (req, res) => {
  res.render("add-contact", { title: "Add Contact" });
});

app.post(
  "/data/add",
  // [query("email").isEmail(), query("phone").isMobilePhone("id-ID")], // method 1
  [
    check("email", "Invalid email").isEmail(),
    check("phone", "Invalid phone").isMobilePhone("id-ID"),
    check("phone").custom((value) => {
      const contact = findPhone(value);
      if (contact) {
        throw new Error("This phone number has registered");
      }
      return true;
    }),
  ], // method 2
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render("add-contact", {
        title: "Add Contact",
        errors: result.array(),
      });
      // console.log(result);
    }

    addData(req.body.name, req.body.phone, req.body.email);
    req.flash("msg", "Contact added");
    res.redirect("/");
  },
);

app.get("/data/:name", (req, res) => {
  // display data details
  const detail = findContact(req.params.name);
  res.render("detail", { title: "Data Detail", detail });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
