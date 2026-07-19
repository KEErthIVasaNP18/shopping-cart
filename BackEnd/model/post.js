const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    Img: {type : String},
    Name: {type : String},
    Category: {type : mongoose.Schema.Types.ObjectId,
        ref:"categories" , required: true
    },
    About: {type : String},
    Price: {type : Number}
})

module.exports =  mongoose.model('eposts',PostSchema )