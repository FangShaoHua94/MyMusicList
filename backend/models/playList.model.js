const mongoose = require('mongoose');

const playListSchema = mongoose.Schema({
    title: String,
    genre: String,
    remark: String,
    songList: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
},
    {
        collection: 'PlayList'
    });

const PlayList = mongoose.model('PlayList', playListSchema);

module.exports = { PlayList };