const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Ошибка заполнения поля ' });
});

app.post('/api/data', (req, res) => {
  debugger;
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));