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
      };
    }
  });

  return json;
}

const s = assetsJson();

const html = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>image-space</title>
  <style>
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .wrapper {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 10px;
      grid-auto-rows: minmax(100px, auto);
    }
  </style>
</head>

<body class='wrapper'>
  ${Object.keys(s)
    .map((item) => {
      const url = `http://localhost:3001/image-space/api/${item}`;
      return `<div class="card">
      <h3>${item}</h3>
      <img width='300px' src=${url}/>
      <a target="_blank" href='${url}'>${url}</a>
    </div>`;
    })
    .join("")}
</body>

</html>`;

fs.writeFileSync("./public/index.html", html);
fs.writeFileSync("./data.json", JSON.stringify(s));
