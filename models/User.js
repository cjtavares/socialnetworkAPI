const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        match: /^([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        unique: true,
    },
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON:{
        virtuals: true,
    },
    id: false,
}
);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

const User = model('User', userSchema);

module.exports = User;
