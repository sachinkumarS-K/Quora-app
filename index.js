const express = require("express");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

const app = express() ;
const port = 8000 ;
const path = require("path");

const viewPath = path.join(__dirname,"views")

app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , "public")));

app.set("view engine" , "ejs");
app.set("views" , viewPath);

let posts = [
    {  id : uuidv4(),
        userName : "Sachin" ,
        content : "'i read in class 10"
    },
    {   id : uuidv4(),
        userName : "Shubham" ,
        content : "Suding in class 7"
    },
    {   id : uuidv4(),
        userName : "Mohit" ,
        content : "Suding in class 8"
    },
    {   id : uuidv4(),
        userName : "Satyam" ,
        content : "Suding in class 9"
    },
    {   id : uuidv4(),
        userName : "shyam" ,
        content : "Suding in class 19"
    },
    {   id : uuidv4(),
        userName : "Sonu" ,
        content : "Suding in class 10"
    }
]



app.get("/" , (req , res)=>{
        res.send(`Index route`)
}) ;

app.get("/posts" , (req , res) => {
    res.render("home.ejs" , {posts})
});

app.get("/posts/new" , (req , res)=> {
    res.render("form.ejs")
})

app.post("/posts" , (req ,res) => {
    console.log(req.body);
    const {userName , content} = req.body ;
    let id = uuidv4() ;
    console.log(id);
    posts.push({id , userName , content})
    res.redirect("/posts");
});

app.get("/posts/:id" , (req, res) => {
    let {id} = req.params ;
    console.log(id);
    let post = posts.find((e) => id ==e.id);
    console.log(post);
    res.render("show.ejs" , {post});
});


app.delete("/posts/:id" , (req , res) => {
    let {id} = req.params ;
    console.log(id);
     posts = posts.filter((e) => id !== e.id);
     console.log(posts);
    res.redirect("/posts");
 
})

app.listen(port , () => {
    console.log(`server is running on ${port}`);
})