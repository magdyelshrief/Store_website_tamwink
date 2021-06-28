const express = require('express');
const router = express.Router();
const data=require('../local/data');
const auth=require('../controllers/auth');
router.get("/",(req,res)=>
{
    res.render('index');
});
router.get("/Admin",(req,res)=>
{
    res.render('Admin');
});
router.get("/User",(req,res)=>
{
    res.render('User');
});
//Dashboard for Client
router.get('/Homepage',(req,res)=>{ 
    console.log(req.session.user);
    if(!req.session.user)
    res.status(401).render('user/HomePage',{status:false});
    else
    res.status(200).render('user/HomePage',{status:true});
 
});
// Dashboar of employee
router.get('/HomepageE',(req,res)=>{ 
    console.log(req.session.admin);
    if(!req.session.admin)
    res.status(401).render('HomePageE',{status:false});
    else
    res.status(200).render('HomePageE',{status:true});
 
});
//Client Profile
router.get('/Userprofile',(req,res)=>{
    auth.UserProfile(req,res);  
});
router.get('/ProfileE',(req,res)=>{
    auth.ProfileE(req,res);  
});
router.get('/logout',(req,res)=>{
    req.session.admin.username=null; 
    res.status(200).render('index');
})

module.exports = router;
