const { User, Thoughts } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => {return res.json(users)})
        .catch((err) =>{
            console.error({ message: err});
            return res.status(500).json(err);
        });
    },
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user))
        .catch((err) => res.status(500).json(err))
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with this id!'})
        : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => 
        !user
        ? res.status(404).json({message: 'No user with this id!'})
        : Thoughts.deleteMany({ _id: { $in: user.Thoughts } })
        )
        .then(() => res.json({ message: 'User and their thoughts deleted'}))
        .catch((err) => res.status(500).json(err))
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },

    removeFriends(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
}