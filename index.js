
const express = require('express');
const appConfig = require('./config/appconfig');


const app = express();
const fs = require('fs');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

let mongoose = require("mongoose");

let modelpath = './model';
fs.readdirSync(modelpath).forEach( (file) => {
    if(~file.indexOf('.js')) {
        console.log(file);
        require(modelpath + '/' + file);
    }
})

let routerPath = './routes'
fs.readdirSync(routerPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        console.log(routerPath + '/' + file);
        let route = require(routerPath + '/' + file);
        route.setroute(app);
    }
})



app.listen(appConfig.port, () => {

    console.log(`Example app listening on port ${appConfig.port}!`)
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });
})

mongoose.connection.on('error', (err)=>{
    console.log("database connection error");
    console.log(err);
})

mongoose.connection.on('open', (err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("database connection succesfull");
  }
    
})