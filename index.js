const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;

const prefix = "/image-space";

const _assetsJson = assetsJson();
console.log(_assetsJson);

app.get(prefix + "/api/:type", (req, res) => {
  const type = req.params.type;
  const max = _assetsJson[type];

  if (!max) {
    res.redirect(404, "type 不存在");
  }
  const url = `${prefix}/${type}/${Random(0, max - 1)}.jpg`;
  console.log(url);
  res.redirect(302, url);
});

app.use(prefix, express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function Random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function assetsJson() {
  const res = fs.readdirSync("./public");
  let json = {};
  res.map((item) => {
    const dir = "./public/" + item;
    if (fs.lstatSync(dir).isDirectory()) {
      json[item] = fs.readdirSync(dir).length;
    }
  });

  return json;
}
