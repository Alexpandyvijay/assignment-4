const express = require('express')
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const port = 3000
// app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

function validation(n1,n2){
    n1 = parseInt(n1);
    n2 = parseInt(n2);
    if(n2<-1000000 || n1<-1000000){
        return "Underflow";
    }else if(n2>1000000 || n1>1000000){
        return "Overflow";
    }else if(isNaN(n1) || isNaN(n2)){
        return "Invalid data types";
    }else{
        return 'success';
    }
}

app.get('/', function (req,res) {
    res.render('page');
})

app.post('/add', function(req,res) {
    let feed1 = {};
    if(validation(parseInt(req.body.num1),parseInt(req.body.num2))!=='success'){
        feed1.status='error';
        feed1.message= validation(parseInt(req.body.num1),parseInt(req.body.num2));
    }else{
        feed1.status='success';
        feed1.message='the sum of given two numbers';
        feed1.result=parseInt(req.body.num1)+parseInt(req.body.num2);
    }
    res.json(feed1);
})

app.post('/subtract', function(req,res) {
    let feed2 = {};
    if(validation(parseInt(req.body.num1),parseInt(req.body.num2))!=='success'){
        feed2.status='error';
        feed2.message= validation(parseInt(req.body.num1),parseInt(req.body.num2));
    }else{
        feed2.status='success';
        feed2.message='the difference of given two numbers';
        feed2.result=parseInt(req.body.num1)-parseInt(req.body.num2);
    }
    res.json(feed2);
})

app.post('/divide', function(req,res) {
    let feed3 = {};
    if(parseInt(req.body.num2)===0){
        feed3.status='error';
        feed3.message= "Cannot divide by zero";
    }else{
        feed3.status='success';
        feed3.message='the division of given two numbers';
        feed3.result=parseInt(req.body.num1)/parseInt(req.body.num2);
    }
    res.json(feed3);
})

app.post('/multiply', function(req,res) {
    let feed4 = {};
    if(validation(parseInt(req.body.num1),parseInt(req.body.num2))!=='success'){
        feed4.status='error';
        feed4.message= validation(parseInt(req.body.num1),parseInt(req.body.num2));
    }else{
        feed4.status='success';
        feed4.message='the product of given two numbers';
        feed4.result=parseInt(req.body.num1)*parseInt(req.body.num2);
    }
    res.json(feed4);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;