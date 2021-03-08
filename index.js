const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3001;

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/lang/:lang', (req, res, next) => {
  const path = `./data/${req.params.lang}.json`;
  if (fs.existsSync(path)) {
    const rawData = fs.readFileSync(path);
    const data = JSON.parse(rawData);
    res.json(data);
  }
  next();
});

app.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/404.html'));
})

app.get('*', (req, res) => {
  res.redirect('/404');
})

app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});