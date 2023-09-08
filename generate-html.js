const ejs = require("ejs");
const fs = require("fs");

ejs.renderFile("./views/home.ejs", {}, {}, function (err, str) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  fs.writeFileSync("./public/index.html", str);
});
