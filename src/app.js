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
