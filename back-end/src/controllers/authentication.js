const passport = require('passport');
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
}



const signIn = (req,res)=>{

    if(!req.body || !req.body.username || !req.body.password){
        return res.status(400).json({ message: "All fields required."});
    }else{
        passport.authenticate('local', (err, user, info) => {
            let token;
            if (err) {
                return res.status(401).json(err);
            }
            if (user) {
                token = generateJwt(user);
                return res.status(200).send(token);
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
        user.role=req.body.role;
        user.setPassword(req.body.password);

        user.save((err) => {
            if (err){
                return res.status(404).json(err);
            }else{
                let token ="diolamadonna";
                //generateJwt(user);
                return res.status(200).send(token);
            }
        });
    }

};

module.exports = {
    signIn,
    signUp
};