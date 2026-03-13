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
      nickname: "You can also call me Shravu or Aani.",
      headline:
        "I build secure, reliable intelligent systems across AI security, cybersecurity, and dependable machine learning infrastructure.",
      p1:
        "I’m an MS Computer Science (Cybersecurity) student at Stevens Institute of Technology, focused on building security-conscious systems, applied research tools, and dependable technical solutions.",
      researchPrefix:
        "Currently, I work on research advised by ",
      advisorName:
        "Dr. Hao Wang",
      advisorLink:
        "https://intellisys.haow.us/haowang/",
      researchSuffix:
        " at the IntelliSys Lab, where I study how reinforcement learning systems behave under partial failures and design experiments to evaluate system stability and performance degradation.",
      interestTitle:
        "My research interests include:",
      interests: [
        "AI Security",
        "Reinforcement Learning",
        "AI Systems",
        "Machine Learning",
        "High Performance Computing",
        "Cybersecurity and Data Analysis"
      ],
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