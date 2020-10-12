const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        notes = JSON.parse(data);
        function newId() {
        for (let i = 0; i < notes.length; i++) {
            notes[i].id = '' + i;
        }
    }
        

        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });
        app.post('/api/notes', function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            newId();
           noteDb();  
        });

        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"))
        });

        function noteDb() {
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notes)
              );
        }
    });
}