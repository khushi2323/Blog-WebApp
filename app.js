//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hey there!!!";
const aboutContent = "Heyyy, I am Khushi Shukla, Sophomore at Adani University. This website project, inspired by Angela Yu's bootcamp on Udemy, embodies a minimalist blog style and has been further refined and enhanced. The project incorporates various technologies, including Html, CSS, Bootstrap, Javascript, Node.js, Express.js, and EJS templates.";
const contactContent = "You've found me at Github, feel free to contact me at any time.";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static("public"));

let posts = [];
   
app.get("/", function (req, res) {
  res.render("home.ejs", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function (req, res) {
  res.render("about.ejs", { aboutContent: aboutContent });
})

app.get("/contact", function (req, res) {
  res.render("contact.ejs",{ contactContent:contactContent})
})

app.get("/compose", function (req, res) {
  res.render("compose.ejs");
})

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  
  posts.push(post);
  
  res.redirect('/');
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post.ejs", {
        title: post.title,
        content:post.content
        })
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});