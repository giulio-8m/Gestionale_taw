let mongoose=require('mongoose');

const server ='localhost:27017';
const database= 'taw_prova';
const user ="";
const password ="";

//mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`);

mongoose.connect(`mongodb://${server}/${database}`);

let usersSchema= new mongoose.Schema({

    username:{
        type:String,
        require:true,
        unique:true
    },
    password:String,
    role:String,
});

module.exports = mongoose.model('Users',usersSchema);
