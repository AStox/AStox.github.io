// generate-html.js

const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

function createFolderStructure(directory, filename) {
  const folderPath = path.join("public", directory);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  const htmlFilePath = path.join(folderPath, "index.html");
  return htmlFilePath;
}

fs.readdir("views", (err, files) => {
  if (err) return console.error(err);

  files.forEach((file) => {
    if (file === "partials" || path.extname(file) !== ".ejs") return;

    const ejsFilePath = path.join(__dirname, "views", file);
    const directory = file.replace(".ejs", "");
    const htmlFilePath = createFolderStructure(directory, file);

    const projectData = fs.existsSync(`./data/${directory}.json`)
      ? require(`./data/${directory}.json`)
      : {};

    ejs.renderFile(ejsFilePath, { projectData }, {}, (err, str) => {
      if (err) return console.error(err);
      fs.writeFileSync(htmlFilePath, str);
    });
  });
});
