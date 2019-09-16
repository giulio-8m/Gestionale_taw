const mongoose= require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

class Database {

  constructor() {

    this.server ='localhost:27017';
    this.database= 'taw_prova';
    this.user ="";
    this.password ="";
    this._connect(this.server,this.database);

    }
  
    _connect(server,database){
        mongoose.connect(`mongodb://${server}/${database}`,{useNewUrlParser:true})
            .then(function onconnected() {
                console.log("Connected to MongoDB");
            },function onrejected() {
                console.log("Unable to connect to MongoDB");
            }); 
    }
}

module.exports = new Database();