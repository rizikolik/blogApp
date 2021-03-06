const bodyParser       =require("body-parser"),
      methodOverride   =require("method-override"),
      expressSanitizer =require("express-sanitizer"),
      mongoose         =require("mongoose"),
      express          =require("express"),
      app              =express();
      
      

//APP CONFİG
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());/////this use must be after the body-parser!!!!!!!!!!!!
app.use(methodOverride("_method"));



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

//INDEX ROUTE    
app.get("/blogs",(req,res)=>{
   Blog.find({},(err,blogsfinded)=>{
      if(err){
         console.log(err);
      } else {
         res.render("index",{find:blogsfinded})// IAM CALLİNG THE WANTED BLOGS AS "FİND"
      }
   })
})
// NEW ROUTE//
app.get("/blogs/new",(req,res)=>{
    res.render("new");
})
//CREATE ROUTE // 
app.post("/blogs",(req,res)=>{
   //create a new blog
   req.body.blog.body=req.sanitize(req.body.blog.body);//  for user side input codes
   Blog.create(req.body.blog,(err,CreatedBlog)=>{
   if(err){
     res.render("new");
   }else{
      //AFTER CREATE REDİRECT 
      res.redirect("/blogs");
   }
   })
})
//SHOW ROUTE
app.get("/blogs/:id",(req,res)=>{
   Blog.findById(req.params.id,(err,wantedBlog)=>{ //// I am calling the wanted id as : "foundeditem"//
      if(err){
         res.redirect("/blogs");
      }else{
         res.render("show",{foundeditem:wantedBlog});
      }
   });
});
//EDIT ROUTE
app.get("/blogs/:id/edit",(req,res)=>{
   Blog.findById(req.params.id,(err,wantedtoeditBlog)=>{
      if(err){
         res.render("/blogs");
      }else{
         res.render("edit",{foundeditem_edit:wantedtoeditBlog});
      }
   });
});
//UPDATE ROUTE
app.put("/blogs/:id",(req,res)=>{
   req.body.blog.body=req.sanitize(req.body.blog.body);//  for user side input codes
   Blog.findByIdAndUpdate(req.params.id,req.body.blog,(err,updatedBlog)=>{
      if(err){
         res.redirect("/blogs");
      }else{
         res.redirect("/blogs/"+req.params.id)
      }
   })
})
//DELETE ROUTE
app.delete("/blogs/:id",(req,res)=>{
   Blog.findByIdAndRemove(req.params.id,(err)=>{
      if(err){
         res.redirect("/blogs");
      }else{
         res.redirect("/blogs");
      }
   })
  
});





app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Your server is activated..");
});
      