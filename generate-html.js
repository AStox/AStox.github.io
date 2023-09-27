// generate-html.js
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const viewsDir = path.join(__dirname, "views");
const outputDir = path.join(__dirname, "public");

const viewFiles = fs.readdirSync(viewsDir);

viewFiles.forEach((file) => {
  const nameWithoutExtension = path.basename(file, ".ejs");
  const filePath = path.join(viewsDir, file);

  let projectData = null;
  try {
    projectData = require(`./data/${nameWithoutExtension}.json`);
  } catch (err) {
    // No JSON file exists for this EJS template, set projectData as empty object
    projectData = {};
  }

  ejs.renderFile(filePath, { projectData }, (err, str) => {
    if (err) {
      console.error(`Error in rendering EJS to HTML: ${err}`);
      return;
    }

    let folderName = "games"; // Or dynamically determine this
    const outputFolder = path.join(outputDir, folderName, nameWithoutExtension);
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }
    const outputFile = path.join(outputFolder, "index.html");

    fs.writeFileSync(outputFile, str);
    console.log(`Generated ${outputFile}`);
  });
});
