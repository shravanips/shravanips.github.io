const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const indexRoutes = require("./routes/index");
const pagesRoutes = require("./routes/pages");
const mediaRoutes = require("./routes/media");

const app = express();
const PORT = process.env.PORT || 3000;

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    helpers: {
      eq: (a, b) => a === b
    }
  })
);


app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Global template variables (available in ALL handlebars views/partials)
app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();

  // Used by main.handlebars footer: {{footerLocation}}
  res.locals.footerLocation = "Hoboken, NJ, USA";

  // Optional: keep for future use
  res.locals.location = res.locals.footerLocation;

  res.locals.lastUpdated = "Feb 2026"; // change whenever you want
  next();
});

app.use("/", indexRoutes);
app.use("/", pagesRoutes);
app.use("/", mediaRoutes);

// 404 (keep LAST)
app.use((req, res) => {
  res.status(404).render("notfound", {
    title: "Not Found",
    active: ""
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio running on http://localhost:${PORT}`);
});
