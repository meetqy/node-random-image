const express = require("express");
const _assetsJson = require("./data.json");
const app = express();
const port = 3001;

const prefix = "/image-space";

app.get(prefix + "/api/:type", (req, res) => {
  const type = req.params.type;
  const max = _assetsJson[type].files.length;

  if (!max) {
    res.redirect(404, "type 不存在");
  }

  const index = Random(0, max - 1);

  const url = `${prefix}/${type}/${_assetsJson[type].files[index]}`;

  res.redirect(302, url);
});

app.use(prefix, express.static("public"));

app.listen(port, () => {
  console.log(`host: http://localhost:${port}/image-space/`);
});

function Random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
