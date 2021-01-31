const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { Song, PlayList, User } = require('./models');

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/MusicSpace', {useNewUrlParser:true,  useUnifiedTopology: true})
    .then(() => console.log("Connected to mongodb successfully."))
    .catch((e) => console.log("error while attemping to connect to mongodb"));

// user route will be handle using auth in headers

// mySong -> display all Song and Song playLists
// myplayList/:playListId -> display particular Song playList

// allsong/:songId -> display particular Song page
// allsong -> display all available Song

app.get('/allSongs', (req, res) => {
    Song.find({
    }).then((allSongs) => {
        res.send(allSongs);
    }).catch((error) => {
        res.status(404).send(error);
    })
})

app.get('/mySongs', (req, res) => {
    Song.find({
    }).then((mySongs) => {
        res.send(mySongs);
    }).catch((error) => {
        res.status(404).send(error);
    })
})

app.post('/mySongs', (req, res) => {
    const song = req.body;
    const newSong = new Song(song);
    newSong.save().then((allSongs) => {
        res.send(allSongs);
    }).catch((error) => {
        res.send(error);
    })
})

app.patch('/mySongs/:songId', (req, res) => {
    Song.findOneAndUpdate({_id: req.params.songId}, { $set: req.body })
    .then(() => {
        res.send({ 'message': 'updated successfully'});
    }).catch((error) => {
        res.send(error);
    })
})

app.delete('/mySongs/:songId', (req, res) => {
    Song.findByIdAndRemove({_id: req.params.songId})
    .then((removedSong) => {
        res.send(removedSong);
    }).catch((error) => {
        res.send(error);
    })
})


// Song folders
app.get('/myPlayLists', (req, res) => {
    PlayList.find({
    }).then((myPlayLists) => {
        res.send(myPlayLists);
    }).catch((error) => {
        res.status(404).send(error);
    })
})

app.post('/myPlayLists', (req, res) => {
    const playList = req.body;
    const newPlayList = new PlayList(playList);
    newPlayList.save().then((allPlayLists) => {
        res.send(allPlayLists);
    }).catch((error) => {
        res.send(error);
    })
})

app.patch('/myPlayLists/:playListId', (req, res) => {
    PlayList.findOneAndUpdate({_id: req.params.playListId}, { $set: req.body })
    .then(() => {
        res.send({ 'message': 'updated successfully'});
    }).catch((error) => {
        res.send(error);
    })
})

app.delete('/myPlayLists/:playListId', (req, res) => {
    PlayList.findByIdAndRemove({_id: req.params.playListId})
    .then((removedPlayList) => {
        res.send(removedPlayList);
    }).catch((error) => {
        res.send(error);
    })
})

app.get('/', (req, res) => {
    res.send("Hello to Music Space api");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})