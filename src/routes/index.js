import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Shravani Sawant",
    year: new Date().getFullYear(),
    headline: "Hey, I’m Shravani 👋",
    subtext:
      "I build security-focused systems and data-driven applications — and I love turning research into real products.",
  });
});

export default router;
