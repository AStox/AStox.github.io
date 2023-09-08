const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

// Make sure the directory  exists
const outputDir = "./public";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const outputFile = path.join(outputDir, "index.html");

ejs.renderFile("./views/home.ejs", {}, {}, function (err, str) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  fs.writeFileSync(outputFile, str);
});
