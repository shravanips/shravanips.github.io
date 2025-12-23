const express = require("express");
const router = express.Router();

const education = require("../data/education.json");
const experience = require("../data/experience.json");
const publications = require("../data/publications.json");
const certifications = require("../data/certifications.json");

router.get("/experience", (req, res) => {
  res.render("experience", {
    title: "Experience",
    active: "experience",
    experience
  });
});

router.get("/education", (req, res) => {
  res.render("education", {
    title: "Education",
    active: "education",
    education
  });
});

router.get("/publications", (req, res) => {
  res.render("publications", {
    title: "Publications",
    active: "publications",
    publications
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    active: "about"
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    active: "contact"
  });
});

router.get("/certifications", (req, res) => {
  res.render("certifications", {
    title: "Certifications",
    active: "certifications",
    certifications
  });
});

module.exports = router;
