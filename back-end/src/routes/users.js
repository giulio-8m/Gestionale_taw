let usersModel = require ('../models/usersModel')
let router=express.Router();

// localhost:3000/users?name=cane&age=22
router.get('/users',(req,res)=>{
    if(req.query.name){
        res.send("you have requested"+req.query.name+req.query.age);
    }

    res.send('You have requested a person');
});

router.get('/users/:name',(req,res)=>{
    res.send("you have requested"+req.params.name);
});

router.get('/users/error',(req,res)=>{
  
    //res.send("you have requested errore");
    throw new Error("errore di errori");
});

router.post('users',(req,res)=>{
    if(!req.body){
        return res.status(400).send('Cattiva richiesta body is missing');
    }else{
        let model=new usersModel(req.body);
        
    }
});


module.exports=router;
