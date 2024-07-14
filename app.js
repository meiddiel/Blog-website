//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3000;

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "I'm RARIVOARISOA Toky Mickael and what you are seeing now is my First blog page. Dont expect anything from this web site, It's only purpose is for the understanding of web development. Actually, I'm a web developer student. I dont have many project and just wanna improve my programing skills. The roadmap will be long and sometimes difficulte and borring but I assume that I will enjoy my journey. I hope, i will become full flage web developer and work on a big project that will change the world";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res) {
  res.render('home', {
    startingContent: homeStartingContent,
    postsContent: posts
  });
});

app.get("/about", function(req, res) {
  res.render('about', { aboutContent: aboutContent });
});

app.get("/contact", function(req, res) {
  res.render('contact', { contactContent: contactContent });
});

app.get("/compose", function(req, res) {
  res.render('compose');
});

app.post("/compose", function(req, res) {
  const composition = {
    title: req.body.postTitle,
    content: req.body.postContent
  };

  posts.push(composition);

  res.redirect("/")

})

app.get('/posts/:postName', function(req, res) {
  console.log(req.params.postName);
})









app.listen(port, function() {
  console.log("Server started on port " + port);
});
