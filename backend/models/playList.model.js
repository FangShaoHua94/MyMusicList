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
        collection: 'PlayList'
    });

const PlayList = mongoose.model('PlayList', playListSchema);

module.exports = { PlayList };