const express = require("express");
const app = express();
const mongoose = require("mongoose")
const port = 8080;

var cors = require('cors');
app.use(cors());
app.use(express.json());


const conn_str = 'mongodb+srv://user1:user1@cluster0.1kbiv4c.mongodb.net/vehicleregistration?retryWrites=true&w=majority'
mongoose.connect(
    conn_str,
{ 
useNewUrlParser: true, 
useUnifiedTopology: true, 
// useCreateIndex: true
},(err) => {
    if (err) {
        console.log("error in connection");
    } 
    else {
        console.log("mongodb is connected");
    }});
//create a server object:
app.listen(port, () => {
console.log("starting the server");
}); 
//the server object listens on port 8080


const Signup = mongoose.model("reggisters",
 {
    mobile:{type:String},
    password: { type: String },
    adar: { type: Number },
    user:{type:String}
})

app.post("/Signup", function (req, res) {
    Signup.findOne({mobile:req.body.mobile,adar:req.body.adar}).then((reggister)=>{
        if(reggister)
        {
            console.log(req.body);
            
            res.send({message:"User already exists" });
        }
        else
        {
            console.log(req.body);
            const reg = new Signup({
            mobile: req.body.mobile,
            password: req.body.password,
            adar:req.body.adar,
            user:req.body.user
        });
            reg.save(function (err) {
                if (err) {
                  console.log("egfgr")
                    throw err;
                } else {
                  res.json({ success:true, mobile:reg.mobile,password:reg.password,adar:reg.adar ,user:req.user});
                }
            });
        }
  });

});
    
app.post("/login", function (req, res) {
    Signup.findOne({mobile:req.body.mobile}).then((reggister)=>{
        
        if(reggister)
        {
            if(req.body.password === reggister.password ) {
                if(reggister.user=="1")
                res.send({message:"user" })
                else
                res.send({message:"admin" })
                
            } else {
                res.send({ message: "Password didn't match"})
            }
        }
        else
        {
            res.send({message:"User doesnot exist"});
            
        }
  });

});
    
   

const Applylis = mongoose.model("aplylis",
 {
    name:{type:String},
    addr:{type:String},
    vehicle:{type:String},
    child:{type:String},
    dob:{type:String},
    dor:{type:String},
    afile:{type:Number},
    status:{type:String},
    lisno:{type:String},
    pfile:{type:String}
    
})

app.post("/applylis", function (req, res) {
    console.log("inside exp.js");
    console.log(req.body);
    
    Applylis.findOne({afile:req.body.afile}).then((aplylis)=>{
        if(aplylis)
        {
            res.send({message:"User already exists" });
        }
        else
        {
            
            console.log("hi")
            const reg1 = new Applylis({
                
                name:req.body.name,
                addr:req.body.addr,
                vehicle:req.body.vehicle,
                child:req.body.child,
                dob:req.body.dob,
                dor:req.body.dor,
                afile:req.body.afile,
                pfile:req.body.myfile,
                status:"pending",
                lisno:"-",
                pfile:req.body.pfile
            
            
            });
            reg1.save(function (err) {
                if (err) {
                  console.log("egfgr")
                    throw err;
                } else {
                    console.log(req.body)
                  res.json({ success:true});
                }
            });
        }
  });

});



const Applypermits = mongoose.model("aplypermitt",
 {
    name:{type:String},
    faddr:{type:String},
    toaddr:{type:String},
    vehicleno:{type:String},
    dor:{type:String},
    adarno:{type:Number},
    status:{type:String},
    pno:{type:String},
    frd:{type:String},
    tod:{type:String},
    
    
})
    
app.post("/applypermits", function (req, res) {
    console.log(req.body)
    
    Applyrec.findOne({vno:req.body.vehicleno,adarno:req.body.adarno}).then((aplyrec)=>{
        
        if(!aplyrec)
        {
         
            res.send({message:"User already exists" });
        }
        else
        {
            
            Applyrec.find({status:"accepted"}).then((aplyrec)=>{
                
                if(aplyrec)
                {
                    
                    const reg2 = new Applypermits({
                
                        name:req.body.name,
                        faddr:req.body.faddr,
                        toaddr:req.body.toaddr,
                        vehicleno:req.body.vehicleno,
                        dor:req.body.dor,
                        adarno:req.body.adarno,
                        frd:req.body.frd,
                        tod:req.body.tod,
                        status:"pending",
                        
                        
                    
                    
                    
                    });
                    reg2.save(function (err) {
                        if (err) {
                          console.log("egfgr")
                            throw err;
                        } else {
                          res.json({ success:true});
                          console.log("done sending")
                        }
                    });

                }
                else{
                    res.send({message:"rc pending"});

                }
            })
           
            
        }

  });

});
    



  

  






  
const Applyrec = mongoose.model("aplyrec",
 {
    name:{type:String},
    addr:{type:String},
    classname: {type:String},
    color: {type:String},
    engno: {type:String},
    fuel: {type:String},
    adarno: {type:String},
    pfile:{type:String},
    status:{type:String},
    vno:{type:String}
    
})

app.post("/applyrc", function (req, res) {
    
    Applyrec.findOne({engno:req.body.engno}).then((aplyrec)=>{
        if(aplyrec)
        {
            res.send({message:"User already exists" });
        }
        else
        {
            
            
            const rc = new Applyrec({
                
                name: req.body.name,
                addr: req.body.addr,
                classname:req.body.classname,
                color: req.body.color,
                engno: req.body.engno,
                fuel: req.body.fuel,
                adarno:req.body.adarno,
                pfile: req.body.pfile,
                status:"pending",
                vno:"-"
            
            
            
            });
            rc.save(function (err) {
                if (err) {
                  console.log("error in backend")
                    throw err;
                } else {
                    
                    console.log(rc)
                  res.json({ success:true});
                }
            });
        }
  });

});




app.post("/accept", function (req, res) 
{

    
    let result = '',result2='';
    let result1 = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers="0123456789"
            const charactersLength = characters.length;
            const numlen=numbers.length;
            let counter = 0,c=0,c1=0;
            while (counter < 2) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            
            while (c < 2) {
              result1 += Math.floor(Math.random()*numlen);
              c += 1;
            }
            
             while (c1 < 4) {
              result2 += Math.floor(Math.random()*numlen);
              c1 += 1;
            }
            
            let x="TS"+" "+result1+" "+result+" "+result2;


    var item = {
                    
        name: req.body.name,
        addr: req.body.addr,
        domfg:req.body.domfg,
        classname:req.body.classname,
        color: req.body.color,
        engno: req.body.engno,
        fuel: req.body.fuel,
        adarno:req.body.adarno,
        pfile: req.body.pfile,
        status:"accepted",
        vno:"TS"+" "+result1+" "+result+" "+result2



    };

    Applyrec.updateOne({"engno":req.body.engno},{$set:item},function(err,result){
        
        console.log("item inserted");
    });

    
    
    
        
})





app.post("/reject", function (req, res) 
{




    var item = {
                    
        name: req.body.name,
        addr: req.body.addr,
        classname:req.body.classname,
        color: req.body.color,
        engno: req.body.engno,
        fuel: req.body.fuel,
        adarno:req.body.adarno,
        status:"rejected",
        vno:"-"



    };

    Applyrec.updateOne({"engno":req.body.engno},{$set:item},function(err,result){
        
        console.log("item inserted");
    });

    
    
    
        
})














app.post("/authrc", function (req, res) {
    if(req.body.option==="1")
    {
        Applyrec.find({status:"accepted"}).then((aplyrec)=>{
            if(aplyrec)
            {
                
                
                res.send({aplyrec})
                

                
            }
        })

    }
    else if(req.body.option==="2")
        {
            Applyrec.find({status:"pending"}).then((aplyrec)=>{
                
                if(aplyrec)
                {
                    
                    res.send({aplyrec})
                    
                }
            })
        }
        else
        {
            Applyrec.find({status:"rejected"}).then((aplyrec)=>{
                if(aplyrec)
                {
                   
                    res.send({aplyrec})
                }
            })

        }
    });

   

// authority lisence


    app.post("/authlis", function (req, res) {
        if(req.body.option==="1")
        {
            Applylis.find({status:"accepted"}).then((aplylis)=>{
                if(aplylis)
                {
                    
                    
                    res.send({aplylis})
                    
    
                    
                }
            })
    
        }
        else if(req.body.option==="2")
            {
                Applylis.find({status:"pending"}).then((aplylis)=>{
                    
                    if(aplylis)
                    {
                        
                        res.send({aplylis})
                        
                        
                    }
                })
            }
            else
            {
                Applylis.find({status:"rejected"}).then((aplylis)=>{
                    if(aplylis)
                    {
                        
                        res.send({aplylis})
                    }
                })
    
            }
        });
    
    
    
    


 app.post("/rejectlis", function (req, res) 
        {
       
        
        
        
            var item = {
                            
                name: req.body.name,
                addr: req.body.addr,
                child:req.body.child,
                dor: req.body.dor,
                dob: req.body.dob,
                vehicle: req.body.vehicle,
                afile:req.body.afile,
                status:"rejected",
                lisno:"-"
        
        
        
            };
        
            Applylis.updateOne({"afile":req.body.afile},{$set:item},function(err,result){
                
                console.log("item inserted");
            });
        
            
            
            
                
        })
        





app.post("/acceptlis", function (req, res) 
{

    console.log("inside acceptlis")
    let result2='';
    let result1 = '';
    const today = new Date();
    const year = today.getFullYear();
            
            const numbers="0123456789"
            
            const numlen=numbers.length;
            let c=0,c1=0;
           
            
            while (c < 2) {
              result1 += Math.floor(Math.random()*numlen);
              c += 1;
            }
            
             while (c1 < 7) {
              result2 += Math.floor(Math.random()*numlen);
              c1 += 1;
            }
            
            let x="TS"+result1+year+result2;
            
          
    var item = {
                    
        name: req.body.name,
        addr: req.body.addr,
        child:req.body.child,
        dor: req.body.dor,
        dob: req.body.dob,
        vehicle: req.body.vehicle,
        afile:req.body.afile,
        status:"accepted",
        lisno:"TS"+" "+result1+year+result2

        
    };

    Applylis.updateOne({"afile":req.body.afile},{$set:item},function(err,result){
        
        console.log("item inserted");
    });

    
    
    
        
})




// AUTHORITY PERMITS


app.post("/authpermits", function (req, res) {
    if(req.body.option==="1")
    {
        Applypermits.find({status:"accepted"}).then((aplypermitt)=>{
            if(aplypermitt)
            {                
                res.send({aplypermitt})                
            }
        })
    }
    else if(req.body.option==="2")
        {
            Applypermits.find({status:"pending"}).then((aplypermitt)=>{
                
                if(aplypermitt)
                {                   
                    res.send({aplypermitt})                                        
                }
            })
        }
        else
        {
            Applypermits.find({status:"rejected"}).then((aplypermitt)=>{
                if(aplypermitt)
                {                    
                    res.send({aplypermitt})
                }
            })

        }
    });
app.post("/rejectper", function (req, res) 
    {
          var item = {                        
            name: req.body.name,
            faddr: req.body.faddr,
            toaddr: req.body.toaddr,
            dor: req.body.dor,            
            vehicleno: req.body.vehicleno,
            adarno:req.body.adarno,
            frd:req.body.frd,
            tod:req.body.tod,
            status:"rejected",
            pno:"-"    
        };
    
        Applypermits.updateOne({"vno":req.body.vno},{$set:item},function(err,result){            
            console.log("item inserted");
        });            
    })
app.post("/acceptper", function (req, res) 
{
let result2='';
let result1 = '';
const today = new Date();
const year = today.getFullYear();        
        const numbers="0123456789"        
        const numlen=numbers.length;
        let c=0,c1=0;               
        while (c < 2) {
          result1 += Math.floor(Math.random()*numlen);
          c += 1;
        }        
         while (c1 < 7) {
          result2 += Math.floor(Math.random()*numlen);
          c1 += 1;
        }        
                  
var item = {                
    name: req.body.name,
    faddr: req.body.faddr,
    toaddr: req.body.toaddr,
    dor: req.body.dor,            
    vehicleno: req.body.vehicleno,
    adarno:req.body.adarno,
    frd:req.body.frd,
    tod:req.body.tod,
    status:"accepted",
    pno:"TS"+" "+result1+year+result2 
};
Applypermits.updateOne({"vno":req.body.vno},{$set:item},function(err,result){    
    console.log("item inserted");
});   
})




//lisence

let mb;
app.post("/lis1", function (req, res) {
    console.log("ewgf");
    mb=req.body.mobile;
});



app.post("/lis", function (req, res) {
    
    console.log("in lis expx")
    console.log(req.body);
    Signup.findOne({mobile:mb,adar:req.body.afile}).then((signup)=>{
    if(signup)
    {
        console.log(signup);
        Applylis.find({afile:req.body.afile,status:"accepted"}).then((aplylis)=>{
            if(aplylis)
            {

                console.log("in lis exp")
                res.send({aplylis})
                
            }
            else
            {
            res.send({message:"not valid adhaar number"})
            }
        
        });
    }
    else{
        res.send({message:"not valid adhaar number"});
    }
})



});

//rc

app.post("/rc", function (req, res) {
    console.log(req.body);
    
    Signup.findOne({mobile:mb,adar:req.body.adarno}).then((signup)=>{
    if(signup)
    {
        console.log(req)    
        Applyrec.find({adarno:req.body.adarno,status:"accepted"}).then((aplyrec)=>{
            if(aplyrec)
            {
                console.log("in rc exp")
                res.send({aplyrec})
                
            }
            else
            {
                
            res.send({message:"not valid adhaar number"})
            }
        });
    }
    else{
        res.send({message:"not valid adhaar number"});
    }
    

})
});


app.post("/permits", function (req, res) {
    
    Signup.findOne({mobile:mb,adar:req.body.adarno}).then((signup)=>{
    if(signup)
    {
            console.log(req)
            Applypermits.find({adarno:req.body.adarno,status:"accepted"}).then((aplypermitt)=>{
                if(aplypermitt)
                {
                    console.log("in rc exp")
                    res.send({aplypermitt})
                    
                }
                else
                {
                    
                res.send({message:"not valid adhaar number"})
                }
             });
    }
    else{
        res.send({message:"not valid adhaar number"});
    }        
    })
});

app.post("/test", function (req, res) {
    console.log("in test");
    console.log(req.body);
    console.log(req.files);
})