const passport = require('passport');
const jwt=require('jsonwebtoken');
//const userModel= require ('../models/user.model');
const mongoose = require('mongoose');
const User = mongoose.model('User');

function generateJwt(user) {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 1); //FIXME: at the moment the token expires in 1 days. A bit too much
    let token = {
      id: user._id,
      username: user.username,
      role: user.role,
      exp: parseInt(expiry.getTime() / 1000, 10)
    };
    return jwt.sign(token, process.env.JWT_SECRET, {algorithm: 'RS256'});
};



const signIn = (req,res)=>{

    if(!req.body || !req.body.username || !req.body.password){
        return res.status(400).json({ message: "All fields required."});
    }else{
        passport.authenticate('local', (err, user, info) => {
            let token;
            if (err) {
                console.log("errore qui\n");    
                return res.status(401).json(err);
            }
            if (user) {
                token = generateJwt(user);
                return res.status(200).json(token);
            } else {
                return res.status(401).json(info);
            }
        })(req, res);
    }

};

const signUp = (req,res)=>{

    if(!req.body || !req.body.username || !req.body.password || !req.body.role){
        return res.status(400).json({ message: "All fields required."});
    }else{

        let user=new User();
        user.username=req.body.username;
       
        user.setPassword(req.body.password);
        user.role=req.body.role;
        user.status=req.body.status;
        user.completedjobs=req.body.completedjobs;
        console.log("i'm trying to register right now before save!!\n");
        console.log(user.toJSON());
        user.save((err) => {
            if (err){
                err.message="Username already taken";
                return res.status(400).json(err);
            }else{
                console.log("salvato con successo yaaay!\n");
                let token =generateJwt(user);
                return res.status(200).json(token);
            }
        });
    }

};

const getUsers = (req,res)=>{

    if(req.query.role){
        User.find({role:req.query.role}).then(function(users){
            res.status(200).json(users);
        })
    }else{
        User.find({}).then(function(users){
            res.status(200).json(users);
        })
    }
};


const updateUser=(req,res)=>{
    console.log(`updating user : ${req.params.id}`);
    if(req.params.id){
        console.log(req.params.id);
        User.findOne({username:req.params.id})
        .then(user => {
            if(req.body.completedjobs){
                user.completedjobs+=req.body.completedjobs;
                user.update((err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.status(200).json("aggiornato lavori completati");
                    }
                });
            }
        })
        .catch(err => {
          console.log(err);
        });

    }
}

const deleteUser=(req,res)=>{
    User.deleteOne({username:req.params.id},(err)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).json("utente cancellato");
        }
    })
}

module.exports = {
    signIn,
    signUp, 
    getUsers,
    updateUser,
    deleteUser
};
