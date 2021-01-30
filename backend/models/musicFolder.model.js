const mongoose = require('mongoose');

const musicFolderSchema = mongoose.Schema({
    title: String,
    genre: String,
    Remark: String,
    Duration: String,
    musicList: [Number],
    createdAt: {
        type: Date,
        default: new Date()
    },
},
    {
        collection: 'MusicFolder'
    });

const MusicFolder = mongoose.model('MusicFolder', musicFolderSchema);

module.exports = { MusicFolder };