const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());

app.post("/blogs", (req, res) => {
  if (req.body.title == null || req.body.content == null) {
    res.status(400);
    res.send("Invalid request");
    return;
  }
  const { title } = req.body;
  const { content } = req.body;
  fs.writeFileSync(title, content);
  res.status(201);
  res.end("ok");
});

app.put("/posts/:title", (req, res) => {
  if (req.body.title == null || req.body.content == null) {
    res.status(400);
    res.send("Invalid request");
    return;
  }
  const { title } = req.params;
  const { content } = req.body;
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.status(200);
    res.end("ok");
  } else {
    res.status(404);
    res.send("This blog does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const { title } = req.params;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.status(200);
    res.end("ok");
  } else {
    res.status(404);
    res.send("This blog does not exist!");
  }
});

app.get("/blogs/:title", (req, res) => {
  const { title } = req.params;
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.status(200);
    res.send(post);
  } else {
    res.status(404);
    res.send("This blog does not exist!");
  }
});

app.get("/blogs", (req, res) => {
  const allFiles = [];
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      res.status(500);
      res.send("Something went wrong");
    }
    files.forEach((file) => {
      if (!path.extname(file) && fs.statSync(file).isFile()) {
        const blog = {
          title: file,
        };
        allFiles.push(blog);
      }
    });
    if (allFiles.length === 0) {
      res.status(404);
      res.send("Sorry, There isn't any blog");
      return;
    }
    res.status(200);
    res.send(allFiles);
  });
});

app.all("*", (req, res) => {
  res.status(404);
  res.send("Blog not found");
});

app.listen(3000);
