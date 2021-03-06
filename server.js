const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require("fs");
const util = require("util");
const path = require("path");
const uni = require ("uniqid");

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
        // console.log(notes);
        // console.log(req.body);
        let newID = uni();
        let newNote = {
            id: newID,
            title: req.body.title,
            text: req.body.text
        }
        notes.push(newNote);
        // console.log(notes);
        asyncWrite(path.join(__dirname,"/db/db.json"),JSON.stringify(notes));
        res.end(newID);
        
    });
});

app.delete("/api/notes/:id",(req,res)=>{

    deleteNote(req.params.id,res);


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


function deleteNote(note,res){
    // console.log("deleting: ");
    // console.log(note);
        asyncRead(path.join(__dirname,"/db/db.json")).then(response=>{
            let notes = JSON.parse(response);
            notes.forEach((element,i) => {
                if(element.id===note){
                    console.log("found");
                    notes.splice(i,1);
                }
            });
            asyncWrite(path.join(__dirname,"/db/db.json"),JSON.stringify(notes)).then(resp=>{
                res.sendFile(path.join(__dirname, "/public/notes.html"));
            });
            
        });


}