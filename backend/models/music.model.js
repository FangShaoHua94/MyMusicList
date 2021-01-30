const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
    title: String,
    artist: String,
    genre: String,
    releaseDate: Date,
    youtubeLink: String,
    remark: String,
    duration: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
    album: String,
    numPlayed: {
        type: Number,
        default: 0,
    }
},
    {
        collection: 'Music'
    });

const Music = mongoose.model('Music', musicSchema);

module.exports = { Music };