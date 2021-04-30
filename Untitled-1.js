// import express from 'express'
// import bodyParser from "body-parser";
// import 'core-js';
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let yup = require('yup');
// import * as yup from 'yup';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.post ('/api/getData', (req, res) => {
  try {
    fs.readFile(`clientLog.txt`, 'utf8', function readFileCallback(err, data){
   if (err) {
       systemLog(err);
       reject(err);
   }
   else {  
      console.log(data); 
      res.send({ express: 'Hello From Express' }); //обработать данные из файла
      resolve("Файл успешно прочитан");
   }
});
} catch (error) {
   console.log("ошибка функции чтения файла");  
}
 
});

app.post('/api/data',async (req, res) => {
 
  let schemaPrice = yup.object().shape({
    price: yup.number().test(
      'is-decimal',
      'invalid decimal',
      value => (value + "").match(`(0|([1-9]\d*))(\.\d+)?`),
    )
  });
  let schemaCount = yup.object().shape({
    count: yup.number().test(
      'is-decimal',
      'invalid decimal',
      value => (value + "").match(`(0|([1-9]\d*))(\.\d+)?`),
    )
  });
  let schemaSumm = yup.object().shape({
    summ: yup.number().test(
      'is-decimal',
      'invalid decimal',
      value => (value + "").match(`(0|([1-9]\d*))(\.\d+)?`),
    )
  });
  let priseValid = "";
  let countValid = "";
  let summValid = "";

  let pr = await schemaPrice
    .isValid({
      price: req.body.data.price
    })
    .then(function(valid) {
      priseValid = valid; 
    });
  let cnt = await schemaCount
    .isValid({
       count: req.body.data.count
    })
    .then(function(valid) {
      countValid = valid; 
    });
  let summa = await schemaSumm
    .isValid({
      summ: req.body.data.summ
    })
    .then(function(valid) {
      summValid = valid; 
    });
 
  if(priseValid && countValid && summValid){
    fs.writeFileSync(`clientLog.txt`, `${req.body.data.price},${req.body.data.count},${req.body.data.summ}`);
    res.send(JSON.stringify({ body:`Данные удачно переданы`}))
  }

  res.send(JSON.stringify({ body:`Неправильно заполнены поля : 
                                   ${!priseValid? '(Цена)':'' } 
                                   ${!countValid? '(Количество)':'' } 
                                   ${!summValid? '(Сумма)':'' }     `}))
});


app.listen(port, () => console.log(`Listening on port ${port}`));