const express = require("express");
const path = require("path");
const app = express();

// Serve static files
app.use(express.static("public"));

// Set EJS as the templating engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index"); // index.ejs should be in your 'views' folder
});

// New Route for projects
app.get("/projects/:category/:projectTitle", (req, res) => {
  const projectTitle = req.params.projectTitle;
  const projectData = require(`./data/${projectTitle}.json`);
  res.render(projectTitle, { projectData });
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/");
});
