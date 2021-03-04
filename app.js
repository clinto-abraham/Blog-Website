//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

  const homeStartingContent = "Blog Website is a home to write your own content on day to day basis. Its a tap on your creative tweet ability on the versatile subjects of politics, science, inventions, and also for the legends, it could be used as a toDoList. We appreciate your sincere time and value of your opinion, that shall never be scribbled away. Happy are those how pour out their hearts into ink. Let your heart be empty for another sunrise, we will keep track on your soul's experience in this small capsule of blogs which interest you.";
  const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
  const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const _ = require('lodash');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const listOfTweet = [];

app.get("/", function(req, res){
  // console.log(listOfTweet);
  res.render("home", {content1: homeStartingContent, newTweet: listOfTweet});
});

app.get("/about", function(req,res){
  res.render("about", {content2:aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {content3:contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});

app.post('/compose', function(req, res){
  const post = {
    title: req.body.userTitle,
    content: req.body.userTweet
  };

  listOfTweet.push(post);
            // let tweetTitle = req.body.userTitle;
            // listOfTweet.push(tweetTitle);
  //save 'userTweet' form data
            //  let item = req.body.userTweet;
  //push 'userTweet' data to 'listOfTweet' array
            // listOfTweet.push(item);
  //reload to root
                  // console.log(tweetTitle);
                  // console.log(item);
    // console.log(post);
  res.redirect("/");
});


app.get('/posts/:postTitle/', function (req, res) {
  const postName = _.lowerCase(req.params.postTitle);
  // console.log(postName);

  listOfTweet.forEach(function(tweet){
    const storedTitle = _.lowerCase(tweet.title);
    if (storedTitle === postName){
      // res.render("post", {newTweet: listOfTweet});    // it collaborates all tweets on single url
      res.render("post", {title: tweet.title, content: tweet.content });
    //   console.log("match found!");
    // } else {
    //   console.log("Not a match");
    }
  });

  

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
