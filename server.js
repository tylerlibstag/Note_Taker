var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
var notesDb = require('./db/db.json')

app.use(express.static('public'))

var bodyParser = require('body-parser')
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({    
  extended: true
})); 

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res){
    console.log('we smacked api/notes!!!!')
   // res.sendFile(path.join(__dirname, ""))
   res.json(notesDb)
})

app.delete("/api/notes/:id", function (req,res){
    console.log('hellooo!! from delete!!', req.body, req.params)

    var newNotes = []

    for (let i = 0; i < notesDb.length; i++) {
       
        console.log('each note ', notesDb[i])
        if (notesDb[i].id !== parseInt(req.params.id)) {
            newNotes.push(notesDb[i])
        }
    }
    console.log('new notes minus the dude we wanted to delete', newNotes)
    notesDb = newNotes
    res.json(notesDb)

})

app.post("/api/notes/", function (req,res){
    console.log("we hit the route",req.body)
    req.body.id = notesDb.length + 1
    notesDb.push( req.body)
    res.json(notesDb)
})


app.listen(PORT, function(){
    console.log('alive on 3000')
})