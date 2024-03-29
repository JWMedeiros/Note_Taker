const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ('fs')

notes.get('/', (req, res) => {
    //read data using FS
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          res.json(JSON.parse(data))
        }
    });
});


notes.post('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
    
          // Add a new note
          //Modify req body here and add note ID
          const {title, text}=req.body

          const newNote ={
            id: uuidv4(),
            title,
            text,
          };

          parsedNotes.push(newNote);
    
          // Write updated reviews back to the file
          fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? res.error(`Error in adding note`)
                : res.json(`Note added successfully 🚀`)
          );
        }
      });
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
          const result = parsedNotes.filter((note) => note.id !== noteId);
          // Write updated reviews back to the file
          fs.writeFile('./db/db.json', JSON.stringify(result),
            (writeErr) =>
              writeErr
                ? res.error(`Error in removing note`)
                : res.json(`Note removed successfully 🚀`)
          );
        }
      });
});
  
  module.exports = notes;