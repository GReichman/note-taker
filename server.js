const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

//go ahead and add the middleware I need to handle POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes",(req,res)=>{

});

app.post("/api/notes",(req,res)=>{

});

app.get("/notes",(req,res)=>{

});

app.get("/*",(req,res)=>{

});


app.listen(PORT, ()=>{
console.log(`listening on port ${PORT}`)
});