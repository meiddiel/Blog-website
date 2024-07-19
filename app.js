//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "I'm RARIVOARISOA Toky Mickael and what you are seeing now is my First blog page. Dont expect anything from this web site, It's only purpose is for the understanding of web development. Actually, I'm a web developer student. I dont have many project and just wanna improve my programing skills. The roadmap will be long and sometimes difficulte and borring but I assume that I will enjoy my journey. I hope, i will become full flage web developer and work on a big project that will change the world";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/", function (req, res) {
  Post.find({})
    .then (function(posts){
    res.render('home', {
      startingContent: homeStartingContent,
      postsContent: posts
    });
  }).catch(function(error){
    console.log(error);
  });
});

app.get("/about", function (req, res) {
  res.render('about', { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render('contact', { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render('compose');
});

app.post("/compose", async function (req, res) {
  if (!req.body.postTitle || !req.body.postContent) {
    return res.status(400).send("Title and content are required");
  }

  try {
    const composition = new Post({
      title: req.body.postTitle,
      content: req.body.postContent
    });

    await composition.save();

    console.log("Successfully saved!");
    res.redirect("/");
  } catch (error) {
    console.log("Error: ", error)
    res.status(500).send("Internal Server Error");
  }
});

app.get('/posts/:postName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (requestedTitle === storedTitle) {
      console.log('Match found!');
      res.render('post', {
        pTitle: post.title,
        pContent: post.content
      });
    } else {
      console.log('Not a Match');
    }
  });
})









app.listen(port, function () {
  console.log("Server started on port " + port);
});
