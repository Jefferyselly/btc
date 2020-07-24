let mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_78mlkjvj:vq81r60ikaaqeuoj6et7v3ccju@ds161028.mlab.com:61028/heroku_78mlkjvj', {useNewUrlParser: true});
// mongoose.connect('mongodb://heroku_0s0tqftx:cd7jbuc2tcidaeps11vnivvduq@ds113732.mlab.com:13732/heroku_0s0tqftx', {useNewUrlParser: true});

mongoose.set('useCreateIndex', true)
module.exports = {mongoose};

