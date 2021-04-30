// import express from 'express'
// import bodyParser from "body-parser";
// import 'core-js';
const express = require('express');
const bodyParser = require('body-parser');
let yup = require('yup');
// import * as yup from 'yup';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/data',async (req, res) => {
  console.log(req.body.data.price);

 
  let schemaPrice = yup.object().shape({
    // price: yup.string().required(),
    price: yup.number().test(
      'is-decimal',
      'invalid decimal',
      value => (value + "").match(/^\d*\.{1}\d*$/),
    )

  });
  let schemaCount = yup.object().shape({
    // price: yup.string().required(),
    count: yup.number().test(
      'is-decimal',
      'invalid decimal',
      value => (value + "").match(/^\d*\.{1}\d*$/),
    )

  });
  let schemaSumm = yup.object().shape({
    // price: yup.string().required(),
    summ: yup.number().test(
      'is-decimal',
      'invalid decimal',
      value => (value + "").match(/^\d*\.{1}\d*$/),
    )

  });
  debugger;
  let priseValid = "";
  let countValid = "";
  let summValid = "";

  let pr = await schema
    .isValid({
      price: req.body.data.price
    })
    .then(function(valid) {
      debugger;
      priseValid = valid; 
    });
  let cnt = await schema
    .isValid({
       count: req.body.data.count
    })
    .then(function(valid) {
      debugger;
      countValid = valid; 
    });
  let summa = await schema
    .isValid({
      summ: req.body.data.summ
    })
    .then(function(valid) {
      debugger;
      summValid = valid; 
    });
  
  console.log(priseValid);
  console.log(countValid);
  console.log(summValid);
  debugger;

 

  // debugger;
  let str = req.body.data.count.toString()
  // debugger;
  // let arr = [23,45,65]
  // arr.map((e) => console.log(e))
  // debugger;
 

  res.send(JSON.stringify({ body:`I received your POST request. This is what you sent me: ${req.body.data.count}`  }))

  // res.send(
  //   `I received your POST request. This is what you sent me: ${str}`,//}
  // );
});

app.listen(port, () => console.log(`Listening on port ${port}`));