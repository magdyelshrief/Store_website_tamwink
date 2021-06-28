const express = require('express');
const mysql = require ('mysql');
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'mohamed',
        database :'products'  
    }
)
//========================================================
exports.Admin = function (req,res){

    
    const {username='',password=''}=req.body;
    const admin={username:username,password:password};
    console.log(username+"\n"+password);
    if(!username || !password ){
        return  res.status(401).render('Admin',{message:'Please Enter UserName And Password'});
    }
    
    //here used view called login
    
        db.query(`SELECT * from employee where username=? and password=?`,[username,password],function(error,rows){
          console.log(rows[0]);
            if(error) res.status(401).render('Admin',{message:'Cannot retrive Data'});
            if(rows.length>0){
                req.session.admin = admin;
                res.status(200).redirect('/HomePageE');     
           }
           else{
               console.log(data[0]);
                res.status(401).render('Admin',{
                message:"Username or Passsword is incorrect",
                status:false
            })
           }
           
        });
        
    
    
    }
//======================================================== Mohamed
exports.User = function (req,res){

    
const {cno='',code=''}=req.body;
const user={cno:cno,code:code};
console.log(cno+"\n"+code);
if(!cno || !code ){
    return  res.status(401).render('User',{message:'Please Enter Card Number And Code'});
}

//here used view called login

    db.query(`SELECT * from login where cno=? and code=?`,[cno,code],function(error,rows){
      console.log(rows[0]);
        if(error) res.status(401).render('User',{message:'Cannot retrive Data'});
      
        if(rows.length>0){
            req.session.user = user;
            res.status(200).redirect('/HomePage');     
       }
       else{
           console.log(data[0]);
            res.status(401).render('User',{
            message:"Username or Passsword is incorrect",
            status:false
        })
       }
       
    });
    


}
//====================================================Mohamed

module.exports.UserProfile = (req,res)=>{
    var temp=req.session.user.cno;
    console.log(temp);
db.query('select * from client where cno=?',[temp],(err,result)=>{
if(result.length>0)
{
    
    //req.info={};
    if(!req.session.user)
    {
        res.status(401).render('user/profile',{status:false
    });
    }else
    res.status(200).render('user/profile',{status:true,
        name:result[0].fname+""+result[0].lname ,
        address:result[0].governorate+" "+result[0].state+""+result[0].street,
        cno:temp,
        personno:result[0].person,
        balance:result[0].person*50
    });
}
else{
    console.log("Not Found User Information");
}
});
}
//==============================================================================================Magdy
module.exports.ProfileE = (req,res)=>{
    if(req.session.admin.username == null)
    res.status(401).send("You have no Access for This Page");
    var temper=req.session.admin.username;
    console.log(temper);
   
db.query('select * from employee where username=?',[temper],(err,result)=>{
if(err) res.status(401).send("You have no Access for This Page");
    if(result.length>0)
{
    console.log(result[0].shopname);
    console.log(result[0].governorate+result[0].state+""+result[0].street);
    //req.info={};
    if(!req.session.admin)
    {
        res.status(401).render('ProfileE',{status:false
    });
    }else
    res.status(200).render('ProfileE',{status:true,
        username:temper,
        ssn:result[0].ssn,
        shopname:result[0].shopname.toString(),
        address:result[0].governorate+result[0].state+""+result[0].street
    });
}
else{
    console.log("Not Found Employee Information");
}
});
}
