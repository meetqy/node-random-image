const fs = require("fs");

function assetsJson() {
  const res = fs.readdirSync("./public");
  let json = {};
  res.map((item) => {
    const dir = "./public/" + item;

    if (fs.lstatSync(dir).isDirectory()) {
      const files = fs.readdirSync(dir).filter((item) => item[0] != ".");
      json[item] = {
        files,
        suffix: files[0].match(/\.(.*?)+/)[0],
      };
    }
  });

  return json;
}

const s = assetsJson();
console.log(s);

fs.writeFileSync("./data.json", JSON.stringify(s));
