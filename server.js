const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const notes = require('./db/db.json')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/notes',(req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
}),


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
}),

app.get('/api/notes', (req, res)=>{
    console.log(notes)
    res.status(200).json(notes);
}),

app.post('/api/notes')
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))