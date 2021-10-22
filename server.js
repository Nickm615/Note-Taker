const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const notes = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.get('/notes',(req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
}),



app.get('/api/notes', (req, res)=>{
    console.log(notes)
    res.status(200).json(notes);
}),

app.post('/api/notes', (req, res)=>{
    const { title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()

        }
        notes.push(newNote)
        const arrStr = JSON.stringify(notes, null, 2)
        fs.writeFile('./db/db.json', arrStr, (err) =>
        err
            ? console.error(err)
            : console.log('succesfully written')
        );

        const response = {
            status: 'success',
            body: newNote,
        };

        res.status(200).json(response);
    } else{
        res.status(500).json('Error in posting note');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
}),

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))