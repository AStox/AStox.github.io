// generate-html.js
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const viewsDir = path.join(__dirname, "views");
const outputDir = path.join(__dirname, "public");

function generateHTML(dir, outputPath = "") {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullItemPath = path.join(dir, item);
    const stat = fs.statSync(fullItemPath);

    if (stat.isDirectory()) {
      if (item !== "partials") {
        generateHTML(fullItemPath, `${outputPath}/${item}`);
      }
    } else if (stat.isFile() && path.extname(item) === ".ejs") {
      const nameWithoutExtension = path.basename(item, ".ejs");
      let projectData = null;

      try {
        projectData = require(`./data/${nameWithoutExtension}.json`);
      } catch (err) {
        projectData = {};
      }

      ejs.renderFile(fullItemPath, { projectData }, (err, str) => {
        if (err) {
          console.error(`Error in rendering EJS to HTML: ${err}`);
          return;
        }

        const targetFolder =
          nameWithoutExtension === "index"
            ? outputDir
            : path.join(outputDir, `${outputPath}/${nameWithoutExtension}`);
        const finalOutputPath = path.join(targetFolder, "index.html");

        fs.mkdirSync(targetFolder, { recursive: true });
        fs.writeFileSync(finalOutputPath, str);
        console.log(`Generated ${finalOutputPath}`);
      });
    }
  });
}

generateHTML(viewsDir);
