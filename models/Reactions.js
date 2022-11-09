const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody:{
        type: String,
        require: true,
        maxlength: 280,
    },
    username:{
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: format,
    }
});

function format(date){
    const createdDate = new Date(date);
    createdDate.toLocaleDateString();
};



module.exports = reactionSchema;