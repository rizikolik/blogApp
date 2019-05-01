const express      =require("express"),
      app          =express(),
      bodyParser   =require("body-parser"),
      mongoose     =require("mongoose");


mongoose.connect("mongodb://localhost/blog_app");
app.use(bodyParser.urlencoded({extended: true}));





app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Your server is activated..");
});
      