const express = require("express");
const router = express.Router();

router.get("/media", (req, res) => {
  res.render("media", {
    title: "Media",
    active: "media"
  });
});

module.exports = router;
