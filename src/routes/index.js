const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Shravani Sawant",
    active: "home",
    bodyClass: "page-home",
    hideFooter: true,

    home: {
      titleLine: "Hi, I’m Shravani 👋",
      advisorName: "Dr. Hao Wang",
      advisorLink: "https://intellisys.haow.us/haowang/",
      location: "Hoboken, NJ, USA"
    },

    social: {
      linkedin: "https://www.linkedin.com/in/shravanisawant03",
      github: "https://github.com/shravanips",
      medium: "https://medium.com/@shravanips"
    }
  });
});

module.exports = router;