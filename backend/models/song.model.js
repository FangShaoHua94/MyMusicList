const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    title: String,
    artist: String,
    genre: String,
    releaseDate: Date,
    youtubeLink: String,
    remark: String,
    duration: {
        minutes: {
            type: Number, 
            min: 0, 
            max: 59,
            default: 0,
        },
        seconds: {
            type: Number, 
            min: 0, 
            max: 59,
            default: 0,
        }
    },
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
        collection: 'Song'
    });

const Song = mongoose.model('Song', songSchema);

module.exports = { Song };