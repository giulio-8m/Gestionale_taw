const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route');


const app=express();
const port=process.env.PORT || 3000;

const db = require('./models/db.model');

// log in console the port where the app is litsening
app.listen(port,()=>console.log(`lisening on port ${port} allah uh akbar`));

// set headerts to avoid CORS error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

//log in console the url of the incoming request
app.use((req,res,next)=>{
    console.log(`${new Date().toString()}=> ${req.originalUrl}\n\n`);
    next();
});

// allowing app to use body parser
app.use(bodyParser.json());

//adding routes
app.use(userRoute);

//handling unexisting api request
app.use((req,res,next)=>{
    res.status(404).send("Ti sei perso arcamadonna...");
});

//handling internal server errors
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Errore del server fa cagare..");
});
