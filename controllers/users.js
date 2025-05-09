const Listing = require("../models/listing");
const User = require("../models/user");
const Review = require("../models/reviews");
const passport = require("passport");




module.exports.signupForm = (req,res)=>{
    res.render("user/signup.ejs")
}

module.exports.loginForm = (req,res)=>{
    res.render("user/login.ejs");
}

module.exports.signup = async(req,res)=>{
    try{
        let{username , email , password} = req.body;
        const newUser  = new User({email , username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success" , "Welcome to Wanderlust");
            res.redirect("/listings");
        })
     
    }catch(e){
        req.flash("error" , "username already registered")
        res.redirect("/signup");
    }
  
}

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return next(err)
        }
        req.flash("success","you are logged out!")
        res.redirect("/listings");
    })
}