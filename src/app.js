import express from "express";
import { engine } from "express-handlebars";
import indexRouter from "./routes/index.js";
import { VIEWS_DIR, PUBLIC_DIR } from "./config/paths.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars setup
app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: "main",
    layoutsDir: `${VIEWS_DIR}/layouts`,
    partialsDir: `${VIEWS_DIR}/partials`,
  })
);
app.set("view engine", "handlebars");
app.set("views", VIEWS_DIR);

// Static files
app.use(express.static(PUBLIC_DIR));

// Routes
app.use("/", indexRouter);

// Basic 404
app.use((req, res) => {
  res.status(404).render("home", {
    title: "Not Found",
    headline: "404 — Page not found",
    subtext: "This page doesn’t exist yet. Use the navbar to go back.",
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio running on http://localhost:${PORT}`);
});
