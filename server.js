const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require("fs");
const util = require("util");
const path = require("path");

const asyncRead = util.promisify(fs.readFile);
const asyncWrite = util.promisify(fs.writeFile);


//go ahead and add the middleware I need to handle POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public/assets/js/")));
app.use(express.static(path.join(__dirname,"/public/assets/css/")));

app.get("/api/notes",(req,res)=>{
    console.log("sending json");
    asyncRead(path.join(__dirname,"/db/db.json")).then(response=>{

        res.json(JSON.parse(response));
    });
});

app.post("/api/notes",(req,res)=>{
    console.log("writing json");
    asyncRead(path.join(__dirname,"/db/db.json")).then(response=>{
        let notes = JSON.parse(response);
        console.log(notes);
        console.log(req.body);
        let newNote = {
            title: req.body.title,
            text: req.body.text
        }
        notes.push(newNote);
        console.log(notes);
        asyncWrite(path.join(__dirname,"/db/db.json"),JSON.stringify(notes));
        res.json(true);
        
    });
});

app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.listen(PORT, ()=>{
console.log(`listening on port ${PORT}`)
});