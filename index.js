const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;

app.use(express.static("public"));

const _assetsJson = assetsJson();
console.log(_assetsJson);

app.get("/api/:type", (req, res) => {
  const type = req.params.type;
  const max = _assetsJson[type];

  if (!max) {
    res.redirect(404, "type 不存在");
    res.send("type 不存在");
  }

  res.redirect(302, `/${type}/${Random(0, max)}.jpg`);
});

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
