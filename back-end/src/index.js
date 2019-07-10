let express= require('express');
let app=express();
const port=process.env.PORT || 3000;
let bodyParser = require('body-parser');
let usersRoute = require('./routes/users');

app.use(bodyParser.json());

app.use((req,res,next)=>{
    console.log(`${new Date().toString()}=> ${req.originalUrl}\n\n`);

    next();
});

app.use(usersRoute);

app.use((req,res,next)=>{

    res.status(404).send("Ti sei perso arcamadonna...");
  
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Errore del server fa cagare..");
    // per mandare un file

});

app.listen(port,()=>console.log(`lisening on port ${port} allah uh akbar`));
