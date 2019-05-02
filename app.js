const bodyParser   =require("body-parser"),
      mongoose     =require("mongoose"),
      express      =require("express"),
      app          =express();
      
      

//APP CONFİG
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//MONGOOSE/MODEL CONFİG
/* MOngoose  Blog Model parts:
title,
image url,
body,
created(date)
*/
const blogSchema= new mongoose.Schema({
  title  :String,
  image  :String,
  body   :String,
  created: 
  {
     type:Date,
   default:Date.now
     
  }
  
});
const Blog=mongoose.model("Blog",blogSchema);

//RESTFUL ROUTES
app.get("/",(req,res)=>{
   res.redirect("/blogs");
})
app.get("/blogs",(req,res)=>{
   Blog.find({},(err,blogsfinded)=>{
      if(err){
         console.log(err);
      } else {
         res.render("index",{find:blogsfinded})
      }
      
   })
   
})
// NEW ROUTE//
app.get("/blogs/new",(req,res)=>{
    res.render("new");
})
//CREATE ROUTE // 
app.post("/create")





app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Your server is activated..");
});
      