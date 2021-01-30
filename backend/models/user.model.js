const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
},
{
    collection : 'User'
});

const User = mongoose.model('User', userSchema);

module.exports = { User };