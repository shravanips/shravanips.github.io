const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Shravani Sawant",
    active: "home",

    bodyClass: "page-home",
    hideFooter: true,

    home: {
      titleLine: "Hey, I’m Shravani 👋",
      headline:
        "I work at the intersection of AI Security, Cybersecurity, and Secure Systems to build reliable, real-world products.",
      p1:
        "I’m an MS Computer Science (Cybersecurity) student at Stevens Institute of Technology, where I focus on building security-focused systems and applied research tools.",
      p2:
        "Currently, I’m working as a Graduate Student Research Assistant, studying the behavior of reinforcement learning systems under partial failures, and designing experimental pipelines to evaluate system stability and performance degradation.",
      p3:
        "I enjoy turning research ideas into practical tools, and I’m especially interested in AI security, fault-tolerant systems, and research-driven engineering.",
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
