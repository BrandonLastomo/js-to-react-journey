import "./utils/conn.js";
import Data from "./model/contact.js";
import express from "express";
import methodOverride from "method-override";
import { check, validationResult } from "express-validator";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// make PUT and DELETE method usable
app.use(methodOverride("_method"));

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

app.get("/data/add", (req, res) => {
  res.render("add-contact", { title: "Add Contact" });
});

app.post(
  "/data/add",
  [
    check("email", "Invalid email").isEmail(),
    check("phone", "Invalid phone").isMobilePhone("id-ID"),
    check("phone").custom(async (value) => {
      const contact = await Data.findOne({ phone: value });
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
    }

    Data.insertMany(req.body);
    req.flash("msg", "Contact added");
    res.redirect("/");
  },
);

app.get("/data/update/:name", async (req, res) => {
  const contact = await Data.findOne({ name: req.params.name });
  res.render("edit-contact", { title: "Edit Contact", contact });
});

app.put(
  "/data",
  [
    check("email", "Invalid email").isEmail(),
    check("phone", "Invalid phone").isMobilePhone("id-ID"),
    check("phone").custom(async (value, { req }) => {
      const contact = await Data.findOne({ phone: value });
      if (contact && value != req.body.oldPhone) {
        throw new Error("This phone number has registered");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const result = validationResult(req); // result filled only if error occured
    if (!result.isEmpty()) {
      const contact = await Data.findOne({ phone: req.body.oldPhone });
      return res.render("edit-contact", {
        title: "Edit Contact",
        errors: result.array(),
        contact,
      });
    }

    Data.updateOne(
      { _id: req.body._id },
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
        },
      },
    ).then(() => {
      req.flash("msg", "Contact edited");
      res.redirect("/");
    });
  },
);

// method 1 delete
// app.get("/data/delete/:name", async (req, res) => {
//   const contact = await Data.findOne({ name: req.params.name });
//   if (!contact) {
//     res.status(404);
//     res.send("404");
//   } else {
//     Data.deleteOne({ _id: contact._id }).then(() => {
//       req.flash("msg", "Contact deleted");
//       res.redirect("/");
//     });
//   }
// });

// method 2 delete
app.delete("/data", (req, res) => {
  Data.deleteOne({ name: req.body.name }).then(() => {
    req.flash("msg", "Contact deleted");
    res.redirect("/");
  });
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
