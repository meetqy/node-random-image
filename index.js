const express = require("express");
const _assetsJson = require("./data.json");
const app = express();
const port = 3001;

const prefix = "/image-space";
const prefix2 = "/r";

const fn = (req, res) => {
  const type = req.params.type;
  const max = _assetsJson[type].files.length;

  if (!max) {
    res.redirect(404, "type 不存在");
  }

  const index = Random(0, max - 1);

  const url = `${prefix}/${type}/${_assetsJson[type].files[index]}`;

  res.redirect(302, url);
};

app.get(prefix2 + "/a/:type", fn);
app.use(prefix2, express.static("public"));

app.get(prefix + "/api/:type", fn);
app.use(prefix, express.static("public"));

app.listen(port, () => {
  console.log(`host: http://localhost:${port}${prefix}/`);
  console.log(`host: http://localhost:${port}${prefix2}/`);
});

function Random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
