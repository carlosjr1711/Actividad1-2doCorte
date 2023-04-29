const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/formulario", (req, res) => {
  console.log(req.body);
  const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;

  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año)
    return res.redirect("/error.html");

  const filename = 'id_123.txt';

  const data = `${id} - ${nombre} - ${apellido} - ${titulo} - ${autor} - ${editorial} - ${año}`;
  fs.writeFile(`./public/datos${filename}`, data, (err) => {
    if (err) throw err;
    console.log(`el archivo ${filename} fue creado.`);
    const file = path.join(__dirname, `./public/datos${filename}`);
    res.download(file, filename, (err) => {
      if (err) throw err;
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hola desde express");
});
app.listen(port, () => {
  console.log(`app funcionando en puerto: ${port}`);
});