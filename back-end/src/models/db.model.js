const mongoose= require('mongoose');

const server ='localhost:27017';
const database= 'taw_prova';
const user ="";
const password ="";

//mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db=mongoose.connect(`mongodb://${server}/${database}`,{useNewUrlParser:true}).then(function onconnected() {
    console.log("Connected to MongoDB");
},function onrejected() {
    console.log("Unable to connect to MongoDB");
});

exports.module=db;