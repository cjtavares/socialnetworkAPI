const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions')

const thoughtsSchema = new Schema({
    thoughtText:{
        type: String,
        require: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: format,
    },
    username:{
        type: String,    
    },
    reactions: [reactionSchema]
});

function format(date){
    const createdDate = new Date(date);
    createdDate.toLocaleDateString();
};

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;