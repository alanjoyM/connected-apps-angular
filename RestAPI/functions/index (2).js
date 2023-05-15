const express = require ('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Project = require('./models/project');
const ProjectStatus = require('./models/projectStatus');
const User = require('./models/user');
const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

//connect to MongoDB
const dbURI = 'mongodb+srv://paithalhillskannur:Manimala713@nodebasics.g3xbbwj.mongodb.net/node-basics?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>{
    console.log('Connected to DB')
})
.catch((err=>{
    console.log(err);
}))

app.listen(3000);
app.get('/',()=>{
    console.log('in method')
});

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/api/getAllProjects',(req,res)=>{
   
    console.log("call received");
   Project.find().sort({createdAt: -1})
   .then((result)=>{
    res.send(result)
   })
   .catch((err)=>{
    console.log(err);
   })
});
app.get('/api/getAllProjectsStatus',(req,res)=>{
    
  
    ProjectStatus.find().sort({createdAt: -1})
   .then((result)=>{
    console.log("result received",result);
    res.send(result)
   })
   .catch((err)=>{
    console.log(err);
   })
});

app.post('/api/insertProject',(req,res)=>{
    
    console.log("req is ",req.body);

    const project = new Project(req.body);
   
    console.log("req is ",req.body);
    project.save()
    .then((results)=>{
        res.send(results)
    })
    .catch((err)=>{
        console.log(err);
       })
  
});

app.post('/api/registerUser',(req,res)=>{
    
    
    const user = new User(req.body);

   
    user.save()
    .then((results)=>{
        res.send(results)
    })
    .catch((err)=>{
        console.log(err);
       })
  
});

app.post('/api/loginUser',(req,res)=>{
    User.findOne({ email: req.body.email, password: req.body.password}).then(user => {
        if(user) {
            res.send(user);
        } else {
            userNone = new User();
            userNone.errorCode="NONE002";
            userNone.errorMessage="Username or password incorrect";
              res.send(userNone);
        }  
    });

});

app.get('/api/getUserByUserId/:id',(req,res)=>{
    const id = req.params.id;
    console.log("id is",id);
    User.findOne(
        {email:id}
    ).then(user=>{
        if(user){
          res.send(user);  
          console.log("user is found",user);
        }
        else{
            result = new User();
            result.errorCode ="NONE001";
            console.log("no user error",result?.errorCode);
            res.send(result);
        }
        
    })
    .catch((err)=>{
        console.log(err);
        result = new User();
        result.errorMessage ="Some error occured, Please try later";
        res.send(result);
       })
})
