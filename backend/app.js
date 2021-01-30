const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { Music, MusicFolder, User } = require('./models');

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/MyMusicList', {useNewUrlParser:true,  useUnifiedTopology: true})
    .then(() => console.log("Connected to mongodb successfully."))
    .catch((e) => console.log("error while attemping to connect to mongodb"));

// user route will be handle using auth in headers

// myMusic -> display all music and music MusicFolders
// myMusicFolder/:musicFolderId -> display particular music MusicFolder

// allmusic/:musicId -> display particular music page
// allmusic -> display all available music

app.get('/allMusic', (req, res) => {
    Music.find({
    }).then((allMusic) => {
        res.send(allMusic);
    }).catch((error) => {
        res.status(404).send(error);
    })
})

app.get('/myMusic', (req, res) => {
    Music.find({
    }).then((myMusics) => {
        res.send(myMusics);
    }).catch((error) => {
        res.status(404).send(error);
    })
})

app.post('/myMusic', (req, res) => {
    const music = req.body;
    const newMusic = new Music(music);
    newMusic.save().then((allMusic) => {
        res.send(allMusic);
    }).catch((error) => {
        res.send(error);
    })
})

app.patch('/myMusic/:musicId', (req, res) => {
    Music.findOneAndUpdate({_id: req.params.musicId}, { $set: req.body })
    .then(() => {
        res.send({ 'message': 'updated successfully'});
    }).catch((error) => {
        res.send(error);
    })
})

app.delete('/myMusic/:musicId', (req, res) => {
    Music.findByIdAndRemove({_id: req.params.musicId})
    .then((removedMusic) => {
        res.send(removedMusic);
    }).catch((error) => {
        res.send(error);
    })
})


app.get('/', (req, res) => {
    res.send("Hello to MY MUSIC LIST api");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})