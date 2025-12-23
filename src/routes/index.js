const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Shravani Sawant",
    active: "home",
    hero: {
      name: "Shravani",
      tagline:
        "I build security-focused systems and data-driven applications — and I love turning research into real products."
    }
  });
});

module.exports = router;
