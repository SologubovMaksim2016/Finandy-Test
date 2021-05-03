
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let yup = require('yup');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.post ('/api/getData', (req, res) => {
  let dataNew ={}
  try {    
    fs.readFile(`data.txt`, 'utf8', function readFileCallback(err, data){
      if (err) {
        console.log(err);
      }
      else { 
        let d = data.split(",") 
        dataNew.price = d[0]
        dataNew.count = d[1]
        dataNew.summ = d[2]
        res.send(JSON.stringify({ body: dataNew }))
      }
    });    
  } catch (error) {
    console.log("ошибка функции чтения файла");  
  } 
});

app.post('/api/data',async (req, res) => {
  try {
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
      fs.writeFileSync(`data.txt`, `${req.body.data.price},${req.body.data.count},${req.body.data.summ}`);
      res.send(JSON.stringify({ body:`Данные удачно переданы`}))
      return;
    }
  
    res.send(JSON.stringify({ body:`Неправильно заполнены поля : 
                                     ${!priseValid? '(Цена)':'' } 
                                     ${!countValid? '(Количество)':'' } 
                                     ${!summValid? '(Сумма)':'' }     `}))
    return;
  } catch (error) {
    console.log(error);
  }  
});


app.listen(port, () => console.log(`Listening on port ${port}`));