const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const { Song, PlayList, User } = require('./models');

dotenv.config();

const app = express();

app.use(bodyParser.json());


// app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            res.status(401).send(err);
            // next();
        } else {
            req.user_id = decoded._id;
            next();
        }
    });
}

let verifysession = (req, res, next) => {
    let refreshToken = req.header('x-refresh-token');

    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            return Promise.reject({
                'error': "user not found"
            })
        }

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    isSessionValid = true;
                }
            }
        })

        if (isSessionValid) {
            next();
        } else {
            return Promise.reject({
                'error': "refresh token has expired or the session is invalid"
            })
        }
    }).catch((err) => {
        res.status(401).send(err);
    })
}


mongoose.connect('mongodb://localhost:27017/MusicSpace', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongodb successfully."))
    .catch((e) => console.log("error while attemping to connect to mongodb"));

mongoose.set('useFindAndModify', false);

// user route will be handle using auth in headers

// mySong -> display all Song and Song playLists
// myplayList/:playListId -> display particular Song playList

// allsong/:songId -> display particular Song page
// allsong -> display all available Song

app.get('/mySongs', authenticate, (req, res) => {
    Song.find({
    }).then((mySongs) => {
        res.send(mySongs);
    }).catch((error) => {
        res.status(404).send(error);
    })
})

app.get('/mySongs/:songId', authenticate, (req, res) => {
    Song.findOne(
        { _id: req.params.songId }
    ).then((mySong) => {
        res.send(mySong);
    }).catch((error) => {
        res.status(404).send(error);
    })
})

app.post('/mySongs', authenticate, (req, res) => {
    const newSong = new Song(req.body);
    newSong.save().then((addedSong) => {
        res.send(addedSong);
    }).catch((error) => {
        res.send(error);
    })
})

app.patch('/mySongs/:songId', authenticate, (req, res) => {
    Song.findOneAndUpdate({ _id: req.params.songId }, { $set: req.body }, { new: true })
        .then((updatedSong) => {
            res.send(updatedSong);
        }).catch((error) => {
            res.send(error);
        })
})

app.delete('/mySongs/:songId', authenticate, (req, res) => {
    Song.findByIdAndRemove({ _id: req.params.songId })
        .then((removedSong) => {
            res.send(removedSong);
        }).catch((error) => {
            res.send(error);
        })
})

// play list
app.get('/myPlayLists', authenticate, (req, res) => {
    PlayList.find({
        _userId: req.user_id
    }).then((myPlayLists) => {
        res.send(myPlayLists);
    }).catch((error) => {
        res.status(404).send(error);
    })
})

app.get('/myPlayLists/:playListId', authenticate, (req, res) => {
    PlayList.findOne({ 
        _id: req.params.playListId,
        _userId: req.user_id
    }).then((playList) => {
        res.send(playList);
    }).catch((error) => {
        res.status(404).send(error);
    })
})

app.get('/myPlayLists/:playListId/mySongs', authenticate, (req, res) => {
    PlayList.findOne({ 
        _id: req.params.playListId,
        _userId: req.user_id
    }).then((playList) => {
        Song.find({
            '_id': { $in: playList.songList }
        }).then((songs) => {
            res.send(songs);
        }).catch((error) => {
            res.status(404).send(error);
        })
    }).catch((error) => {
        res.status(404).send(error);
    })
})

app.post('/myPlayLists', authenticate, (req, res) => {
    const playList = req.body;
    const newPlayList = new PlayList({
        title: playList.title,
        genre: playList.genre,
        remark: playList.remark,
        songList: [],
        _userId: req.user_id
    });
    newPlayList.save().then((addedPlayList) => {
        res.send(addedPlayList);
    }).catch((error) => {
        res.send(error);
    })
})

app.patch('/myPlayLists/:playListId', authenticate, (req, res) => {
    PlayList.findOneAndUpdate({ 
        _id: req.params.playListId,
        _userId: req.user_id
    }, { $set: req.body }, { new: true })
        .then((updatedPlayList) => {
            res.send(updatedPlayList);
        }).catch((error) => {
            res.send(error);
        })
})

app.delete('/myPlayLists/:playListId', authenticate, (req, res) => {
    PlayList.findByIdAndRemove({ 
        _id: req.params.playListId,
        _userId: req.user_id
     })
        .then((removedPlayList) => {
            res.send(removedPlayList);
        }).catch((error) => {
            res.send(error);
        })
})


// User route

app.post('/users', (req, res) => {
    console.log(req)
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        return newUser.generateAccessAuthToken().then((accessToken) => {
            return { accessToken, refreshToken }
        })
    }).then((authTokens) => {
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            return user.generateAccessAuthToken().then((accessToken) => {
                return { accessToken, refreshToken }
            })
        }).then((authTokens) => {
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((err) => {
        res.status(400).send(err);
    })
})

app.get('/users/me/access-token', verifysession, (req, res) => {
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((err) => {
        res.status(400).send(err);
    })
})

app.get('/', (req, res) => {
    res.send("Hello to Music Space api");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})