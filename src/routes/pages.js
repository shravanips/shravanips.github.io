const express = require("express");
const router = express.Router();

const education = require("../data/education.json");
const experience = require("../data/experience.json");
const publications = require("../data/publications.json");
const certifications = require("../data/certifications.json");
const projects = require("../data/projects.json");
const media = require("../data/media.json");


// Shared footer data for ALL pages (same as home style)
const shared = {
  location: "Hoboken, NJ, USA",
  social: {
    linkedin: "https://www.linkedin.com/in/shravanisawant03",
    github: "https://github.com/shravanips",
    medium: "https://medium.com/@shravanips"
  }
};

router.get("/experience", (req, res) => {
  res.render("experience", {
    title: "Experience",
    active: "experience",
    experience,
    ...shared
  });
});

router.get("/education", (req, res) => {
  res.render("education", {
    title: "Education",
    active: "education",
    education,
    certifications,
    ...shared
  });
});


router.get("/publications", (req, res) => {
  res.render("publications", {
    title: "Publications",
    active: "publications",
    publications,
    projects,
    ...shared
  });
});


router.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    active: "about",
    ...shared
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    active: "contact",
    ...shared
  });
});

router.get("/certifications", (req, res) => {
  res.render("certifications", {
    title: "Certifications",
    active: "certifications",
    certifications,
    ...shared
  });
});

router.get("/media", (req, res) => {
  res.render("media", { 
    title: "Media",
    active: "Media",
    media,
    ...shared
  });
});


module.exports = router;
