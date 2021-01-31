const mongoose = require('mongoose');

const playListSchema = mongoose.Schema({
    title: String,
    genre: String,
    remark: String,
    duration: String,
    songList: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
},
    {
        collection: 'playList'
    });

const PlayList = mongoose.model('playList', playListSchema);

module.exports = { PlayList };