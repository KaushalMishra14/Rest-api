const express = require("express")
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "Kaushal",
        content : "Hii, I am a B.Tech student, with strong foundational skills!!",
        postdate : "26-02-2026"
    },
    {
        id : uuidv4(),
        username : "SIRT",
        content : "Hii, we are leading engineering institution in central India!!",
        postdate : "26-02-2026"
    },
    {
        id : uuidv4(),
        username : "Ayush",
        content : "Helping others is my ultimate goal!!",
        postdate : "26-02-2026"
    },
];

app.get("/posts", (req, res) =>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) =>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    let {username, content, postdate} = req.body;
    let id = uuidv4();
    posts.push({id, username, content, postdate});
    res.redirect("/posts")
});

app.get("/posts/:id", (req, res) =>{
    let {id} = req.params;
    console.log(id);
    let post = post.find((p)=> id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs");
});

app.listen(port, () =>{
    console.log("listening on port: 8080");
});